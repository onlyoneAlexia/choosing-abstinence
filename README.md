# Choosing Abstinence — VS Code project

This folder contains the complete source of the pink and burgundy website we built, including its images, fonts, reading samples, boundary scripts, seven-day starter plan, privacy page, and private analytics dashboard.

Live website: https://choosing-abstinence-alexia.timidan-x.chatgpt.site/

## Open and run it

1. Extract the ZIP. Move the `choosing-abstinence` folder into your usual projects folder.
2. In VS Code, choose **File → Open Folder** and select `choosing-abstinence`. You can also open `choosing-abstinence.code-workspace`.
3. Install Node.js **22.13 or newer** and the project's pinned pnpm version. If pnpm is not installed, run this in the VS Code terminal:

   ```sh
   npm install -g pnpm@11.25.0
   ```

4. In the terminal, with this folder as the working directory, run:

   ```sh
   pnpm install --frozen-lockfile
   pnpm setup:local
   pnpm dev
   ```

5. Open **http://localhost:5173**. Keep the terminal running while editing. Press **Ctrl+C** to stop it.

After the first setup, you normally need only `pnpm dev`. The local setup command can be run again to apply new migrations without clearing existing local data. Use these commands on Windows, macOS, or Linux; the older `install:ci` script is for the managed Linux hosting environment.

## See your local analytics dashboard

Open **http://localhost:5173/analytics**, then click **Sign in with ChatGPT**. In local development, this uses the built-in test account `seedy@sites.test`; it does not sign into your real ChatGPT account. `pnpm setup:local` creates an ignored `.dev.vars` file that gives that test account local dashboard access.

Visit the homepage in a private/incognito window to generate a test visit, then refresh the dashboard in your signed-in window. Signed-in owner visits are excluded. Privacy settings such as Do Not Track can also prevent a visit being counted.

Your computer has its own local database. It does not contain the live site's visitors. The public website's live analytics remain at https://choosing-abstinence-alexia.timidan-x.chatgpt.site/analytics and require the configured owner's account.

The counters show visits and interactions, grouped by traffic source. They do not identify individual visitors or their TikTok accounts.

## Where to make changes

| File or folder | What it controls |
| --- | --- |
| `app/page.tsx` | Homepage layout and section headings. |
| `app/globals.css` | Colours, fonts, spacing, responsive layout, and animation. |
| `lib/guide-content.ts` | Reading samples, FAQs, boundary scripts, and starter-plan content. |
| `lib/founder.ts` | Founder name, email, X link, the founder's message and "What I want every reader to know" points. Changing the email or X link here updates the founder card, footer and FAQ together. |
| `components/guide/founder-section.tsx` | Layout of the founder section and the reusable contact buttons. |
| `lib/art.ts` | The gallery pictures, their affirmations, alt text and artist credits, and the butterfly images. |
| `components/guide/art-gallery.tsx` | The "Gentle with yourself" gallery, the floating butterfly and the twinkling stars. |
| `components/guide/practical-tools.tsx` | Interactive script picker and seven-day checklist. |
| `public/images/` | Book mockup and other website images. |
| `public/fonts/` | Self-hosted fonts and their licences. |
| `app/analytics/dashboard.tsx` | Dashboard charts, date filters, CSV export, and social links. |
| `app/api/events/route.ts` | Visit and interaction collection. |
| `app/api/analytics/route.ts` | Protected analytics data endpoint. |
| `app/privacy/page.tsx` | Privacy notice. |
| `db/schema.ts` and `drizzle/` | Database schema and migrations. |
| `docs/design-notes.md` | Design and image-asset details. |

The technology is React, TypeScript, Vinext/Vite, and Cloudflare D1. It is a full source project, so opening an HTML file by itself will not run it.

## Check your changes

```sh
pnpm typecheck
pnpm test
pnpm build
```

The project includes the exact dependency lockfile. Dependencies are downloaded during installation; `node_modules` is intentionally not in the ZIP.

## Hosting and GitHub

Saving a file on your computer changes your local copy. It does not automatically update the live website or GitHub.

The existing `.openai/hosting.json` retains the binding to the original Site. The file `wrangler.local.json` is for your local database setup only. Publishing on another host requires configuring a real database, its migrations, and a trusted authentication layer for the dashboard. Do not publish the localhost test login or trust user-supplied identity headers on an unprotected deployment.

No passwords, access tokens, production secrets, visitor records or dependency folders are included.

The source is on GitHub at https://github.com/onlyoneAlexia/choosing-abstinence. Pushing to GitHub does not update the live website by itself.

The complete paid ebook PDF/DOCX is a separate product and is not embedded in the website source. Payments and delivery of the full ebook have not been enabled.

## Source and local-export notes

The website source is based on commit `322dc95acc4656698345aa531eab5045f25ca94b`. This export adds VS Code workspace tasks, this guide, a safe environment example, a local migration configuration, and a local setup script. The original project README is preserved in `docs/original-project-readme.md`.

Local export checks covered database creation, the homepage, dashboard access, event recording, TypeScript, and the existing analytics tests. Font and vendored-code licences are included with their respective files.
