import { test, expect } from "@playwright/test";

const routes = ["/", "/portfolio", "/about", "/contact"];
for (const width of [1440, 1280, 1024, 768, 375]) {
  for (const route of routes) {
    test(`${route} renders without overflow at ${width}px`, async ({ page }, testInfo) => {
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
      await page.setViewportSize({ width, height: 1000 });
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main")).toBeVisible();
      // Scroll through the entire page so lazy images have actually been requested.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 800) {
          window.scrollTo(0, y);
          await new Promise(resolve => setTimeout(resolve, 60));
        }
      });
      await expect.poll(() => page.locator("img").evaluateAll(images => images.every(image => {
        const isRendered = image.getClientRects().length > 0;
        return !isRendered || (image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0);
      }))).toBe(true);
      const layout = await page.evaluate(() => ({ width: innerWidth, documentWidth: document.documentElement.scrollWidth, bodyWidth: document.body.scrollWidth }));
      expect(layout.documentWidth).toBeLessThanOrEqual(width);
      expect(layout.bodyWidth).toBeLessThanOrEqual(width);
      const clipped = await page.locator("h1,h2,h3,button,input,select,textarea").evaluateAll(elements => elements.filter(element => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && (rect.right > innerWidth + 1 || rect.left < -1);
      }).map(element => element.outerHTML.slice(0, 200)));
      expect(clipped).toEqual([]);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: testInfo.outputPath(`${route === "/" ? "home" : route.slice(1)}-${width}.png`), fullPage: true });
      expect(errors).toEqual([]);
    });
  }
}

test("portfolio shows one uncategorized gallery with the complete image set", async ({ page }) => {
  await page.goto("/portfolio");
  await expect(page.locator(".gallery-card")).toHaveCount(21);
  await expect(page.locator(".gallery-filter")).toHaveCount(0);
  await expect(page.locator(".gallery-caption")).toHaveCount(0);
  expect(new Set(await page.locator(".gallery-card img").evaluateAll(images => images.map(image => image.getAttribute("src"))))).toHaveProperty("size", 21);
});

test("selected cards expand within the row to match the featured design", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const cards = page.getByTestId("selected-card");
  await expect(cards).toHaveCount(4);

  const secondCard = cards.nth(1);
  await secondCard.scrollIntoViewIfNeeded();
  expect((await secondCard.boundingBox())?.width).toBeLessThan(300);
  await expect(secondCard.locator("figcaption")).toHaveCSS("opacity", "1");

  for (const card of await cards.all()) {
    const before = await card.boundingBox();
    await card.hover();
    await expect(card.locator("figcaption")).toHaveCSS("opacity", "0");
    await expect(card).toHaveCSS("width", "480px");
    await expect(card).toHaveCSS("height", "480px");
    await expect(card).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
    expect((await card.boundingBox())?.width).toBeGreaterThan((before?.width ?? 0) + 100);
    const expanded = await card.boundingBox();
    expect(Math.abs((expanded?.width ?? 0) - (expanded?.height ?? 0))).toBeLessThan(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }

  await page.mouse.move(0, 0);
  await expect(secondCard.locator("figcaption")).toHaveCSS("opacity", "1");
  await secondCard.focus();
  await expect(secondCard.locator("figcaption")).toHaveCSS("opacity", "0");
});

for (const width of [1440, 375]) {
  test(`inquiry validation and EmailJS submission at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    let emailPayload: Record<string, unknown> | undefined;
    await page.route("**/api/v1.0/email/send", async route => {
      emailPayload = route.request().postDataJSON();
      await route.fulfill({ status: 200, contentType: "text/plain", body: "OK" });
    });
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send Secure Inquiry" }).click();
    await expect(page.locator(".field-error")).toHaveCount(4);
    await expect(page.getByRole("textbox", { name: "Name", exact: true })).toBeFocused();
    await page.getByRole("textbox", { name: "Name", exact: true }).fill("Jordan Taylor");
    await page.getByRole("textbox", { name: "Email", exact: true }).fill("invalid-email");
    await page.getByRole("combobox", { name: "Inquiry Type" }).selectOption({ value: "Editorial Wedding / Elopement" });
    await page.getByRole("textbox", { name: "Event Details & Location" }).fill("A summer wedding in Provence for 50 guests.");
    await page.getByRole("button", { name: "Send Secure Inquiry" }).click();
    await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Email", exact: true })).toBeFocused();
    await page.getByRole("textbox", { name: "Email", exact: true }).fill("jordan@example.com");
    await page.getByRole("button", { name: "Send Secure Inquiry" }).click();
    await expect(page.locator("form").getByRole("status")).toContainText("inquiry has been sent");
    await expect(page.locator(".field-error")).toHaveCount(0);
    expect(emailPayload).toMatchObject({
      template_params: {
        from_name: "Jordan Taylor",
        from_email: "jordan@example.com",
        reply_to: "jordan@example.com",
        inquiry_type: "Editorial Wedding / Elopement",
        message: "A summer wedding in Provence for 50 guests.",
      },
    });
  });
}

test("desktop navigation, home actions, logo and footer anchors", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.getByRole("link", { name: "View Selected Galleries", exact: true }).click();
  await expect(page).toHaveURL(/\/portfolio$/);
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await page.locator("header").getByRole("link", { name: "Inquire Now" }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await page.locator("header").getByRole("link", { name: "Cam Click home" }).click();
  await expect(page).toHaveURL(/\/$/);
  await page.getByRole("link", { name: "Read the Philosophy" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await page.getByRole("link", { name: "Services", exact: true }).click();
  await expect(page).toHaveURL(/\/#services$/);
  await expect(page.locator("#services")).toBeInViewport();
  await page.getByRole("link", { name: "Client Galleries", exact: true }).click();
  await expect(page).toHaveURL(/\/portfolio#full-gallery$/);
  await expect(page.locator("#full-gallery")).toBeInViewport();
});

test("footer links only to the configured social profile", async ({ page }) => {
  await page.goto("/");
  const socials = page.getByRole("list", { name: "Social platforms" });
  await expect(socials.getByRole("link", { name: "Instagram" })).toHaveAttribute("href", "https://www.instagram.com/camclick.in/");
  await expect(socials).not.toContainText("Pinterest");
  await expect(socials).not.toContainText("Facebook");
});

test("mobile keyboard navigation, Escape and reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Close navigation" })).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Portfolio" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Portfolio" }).click();
  await expect(page).toHaveURL(/\/portfolio$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  const duration = await page.locator(".photo img").first().evaluate(element => getComputedStyle(element).transitionDuration);
  expect(duration).toBe("0s");
});
