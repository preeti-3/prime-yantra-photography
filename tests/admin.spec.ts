import { test, expect } from "@playwright/test";

// Run against the local production server started with sanity-preload.cjs and test credentials.
test("admin can sign in, preview, replace one image, restore it and sign out", async ({ page }, testInfo) => {
  await page.route("https://cdn.sanity.io/images/primeyatratest/**", (route) => route.fulfill({
    contentType: "image/png", body: Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/l9sAAAAASUVORK5CYII=", "base64"),
  }));
  await page.goto("/admin");
  await page.getByLabel("Username", { exact: true }).fill("admin");
  await page.getByLabel("Password", { exact: true }).fill("wrong-password");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page.locator('p[role="alert"]')).toContainText("Incorrect");
  await page.getByLabel("Password", { exact: true }).fill("local-test-password-only");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("admin-desktop.png"), fullPage: true });
  const card = page.locator("article").filter({ has: page.getByRole("heading", { name: "Main hero", exact: true }) });
  await card.getByRole("button", { name: "Replace image" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByLabel("Image description")).toHaveValue("Bride in a red veil photographed in dramatic directional light");
  await dialog.locator('input[type="file"]').setInputFiles({ name: "portrait.png", mimeType: "image/png", buffer: Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/l9sAAAAASUVORK5CYII=", "base64") });
  await expect(dialog.locator("img")).toHaveAttribute("src", /^blob:/);
  await dialog.getByLabel("Image description").fill("Integration test wedding portrait");
  await dialog.getByRole("button", { name: "Publish replacement" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("status")).toContainText("Image published");
  await expect(card).toContainText("Custom image");
  // Verify the actual public page consumes the persisted override on a new request.
  await page.goto("/");
  await expect(page.locator(".home-hero-photo img")).toHaveAttribute("alt", "Integration test wedding portrait");
  await expect(page.locator(".home-hero-photo img")).toHaveAttribute("src", /cdn\.sanity\.io/);
  await page.goto("/admin");
  await card.getByRole("button", { name: "Replace image" }).click();
  await expect(dialog.getByLabel("Image description")).toHaveValue("Integration test wedding portrait");
  await dialog.getByRole("button", { name: "Restore original image", exact: true }).click();
  await dialog.getByRole("button", { name: "Yes, restore original" }).click();
  await expect(page.getByRole("status")).toContainText("Original image restored");
  await page.setViewportSize({ width: 375, height: 900 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("admin-mobile.png"), fullPage: true });
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page.getByRole("button", { name: "Sign in", exact: true })).toBeVisible();
});

test("image endpoints reject anonymous and cross-origin writes", async ({ request, baseURL }) => {
  const anonymous = await request.post("/api/admin/images", { headers: { Origin: baseURL! }, data: {} });
  expect(anonymous.status()).toBe(401);
  const foreign = await request.post("/api/admin/images", { headers: { Origin: "https://attacker.invalid" }, data: {} });
  expect(foreign.status()).toBe(403);
});
