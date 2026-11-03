# Connect the image admin to Sanity

## One-time setup

1. Create a project at https://www.sanity.io/manage. Select the Free plan and create a dataset named `production`. A public dataset is fine for public portfolio images. Check the current plan quotas at https://www.sanity.io/pricing.
2. Copy the project ID from the project's settings.
3. Under API → Tokens, create a server token with permission to read documents, upload assets, and create/update/delete documents. For a Free project, use a token role that includes these permissions (the administrator role if that is the available write role). Keep the token private.
4. Add the following to `.env.local` for local development, or to your hosting provider's server environment variables:

```dotenv
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_TOKEN=your_server_write_token
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_unique_password_at_least_12_characters
ADMIN_SESSION_SECRET=your_random_secret_at_least_32_characters
```

Generate a session secret locally:

```sh
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Never put the token, password, or session secret in a `NEXT_PUBLIC_` variable or commit an environment file. No browser CORS permission or browser write token is needed: uploads go through the website's authenticated server.

5. Restart the local server, or deploy once with these environment variables. On Vercel, keep the normal Next.js framework preset and default output directory. Remove any old `out` output-directory override. Static export is no longer used.
6. Open `https://your-website/admin`, sign in, choose Home / Portfolio / About / Branding, and click **Replace image**. Upload a photo, enter its description and click **Publish replacement**.

## Everyday image changes

- Accepted files: JPG, PNG, WebP and GIF, up to 4 MB. Export large camera photos as web-sized JPGs first. For logos, use a transparent PNG or WebP; SVG uploads are intentionally not accepted.
- The preview shows the chosen file before publishing. Cancel leaves the live image unchanged.
- A replacement affects only the chosen position. The page's existing layout and aspect ratio stay the same, so choose a photograph that suits its crop.
- Published replacements show on new page loads immediately. An already-open website checks for changes every 60 seconds and when its tab becomes visible again.
- **Restore original image** removes a position's override. It does not delete assets from Sanity's library; old uploads remain available in the project and count toward its storage quota.
- The original bundled images are displayed when no replacement exists or the CMS has not been connected. A CMS outage does not prevent the rest of the website from rendering.

## Authentication and operation

Admin sessions last eight hours. Cookies are HTTP-only, SameSite Strict and Secure in production. Changing the password or session secret invalidates existing sessions. Write endpoints require both an authenticated session and a matching request origin. Login attempts are limited per server process; a host-level rate limit can provide a shared limit across serverless instances.

The CMS uses a `siteImage` document per image position, with `slot`, `alt`, and an `image.asset` reference. No Studio deployment, database migration, or schema provisioning is necessary for this custom admin. The Sanity token never reaches the browser.

## Verify your connection

After configuration, replace a photo through `/admin`, reload the public page in another browser, and confirm the new image appears. Test **Restore original image** as well. A live upload cannot be verified until real project credentials are configured.
