# Prime Yantra Photography
Adapted from https://github.com/preeti-3/cam-click, preserving its pages, design and image assets.

Contact: +91 9350003424 / kumaraman50099@gmail.com
Locations: Hansi, Hisar, Rohtak, Delhi, Gurgaon, Chandigarh.
Instagram: https://www.instagram.com/prime__yantra_photography/

Run npm install, then npm run dev. Run npm run build, then npm start for a production server. This app now needs a Next.js server (for example Vercel), rather than static file hosting, to support authenticated image uploads.
The inquiry form sends through EmailJS when the three public environment values are configured. See [EmailJS setup](docs/emailjs-setup.md) and [email template](docs/emailjs-template.html). Otherwise, it opens the visitor's email application addressed to the studio; the visitor must send that draft.

Reference photographs are retained and should be replaced with the studio's authorized portfolio before public launch.

## Image admin

Visit `/admin` to replace individual images on the Home, Portfolio and About pages, as well as the header and footer logos. Each image position is independent, even when two positions initially use the same local photograph. Replacements are stored in Sanity and load at runtime; image changes need no code edits or redeployment. Restore original returns one position to its bundled image.

Follow [Sanity and admin setup](docs/sanity-setup.md) to connect your project and configure login. No new packages are needed.
