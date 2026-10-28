# Marci Metzger homepage

A single-page React + Vite redesign of https://marcimetzger.com/, inspired by the supplied architectural website reference: oversized condensed type, a photographic opening, translucent navigation, and a split image-and-facts panel.

## Run locally

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Deploy the `dist` folder to a static host. The build first bundles with Vite, then renders the React homepage into static HTML. React hydrates the same markup in the browser. This makes the content available without waiting for JavaScript and avoids a blank client-only page for crawlers.

If the hosting domain changes, update the canonical URL, Open Graph URLs, JSON-LD URLs in `index.html`, and the URLs in `public/robots.txt` and `public/sitemap.xml` before building. Sites initially deploys privately; a private preview cannot be indexed or used as an unrestricted hiring-manager submission link until public access is enabled.

## Main files

- `src/App.jsx`: page content, accessible dialogs, mobile navigation, gallery, search preferences, and enquiry preparation.
- `src/styles.css`: layout, typography, responsive breakpoints, focus styles, and reduced-motion support.
- `src/enhancements.css`: wide-screen scaling, persistent navigation, partners section, and animation styling.
- `src/main.jsx`: development render and production hydration.
- `src/entry-server.jsx` and `scripts/prerender.mjs`: static HTML generation.
- `public/images`: original-site images plus compressed WebP copies.
- `public/fonts`: locally hosted Barlow Condensed and Manrope fonts.
- `ASSET-SOURCES.md`: asset provenance.

## Functionality and scope

- Mobile menu opens, closes on navigation, and dismisses with Escape.
- The hero cycles through three original-site photos every seven seconds with a slow zoom and crossfade. A pause/play control is provided. Manual slide selection pauses automatic playback. Playback also suspends while the hero is off screen, the tab is hidden, or the mobile menu is open. Reduced-motion preferences disable autoplay initially and remove transitions.
- The navigation stays fixed while scrolling and changes to an opaque, readable surface. In-page links account for the header height. A floating back-to-top control appears after scrolling 650px and returns keyboard focus to the brand link.
- Sections reveal gently as they enter view. Content remains visible in the pre-rendered HTML without JavaScript, and reduced-motion users see content without animation.
- The original brand marks appear in a dedicated Our Partners section, with brokerage, professional affiliation, community, and equal-housing labels.
- The page uses a centered layout up to 1920px wide on larger screens, with body copy generally at 16px and 18px at larger desktop widths.
- All seven original gallery photos open in a native modal dialog. Previous/next, arrow keys, Escape, backdrop dismissal, and focus restoration are supported.
- Search validates price ranges and prepares a criteria summary. It links to the existing official listings page; it does not claim to filter a live MLS feed. Criteria can also be shared through the visitor's text app.
- Contact fields validate locally and prepare a message for copying to the official contact form or opening in the visitor's text app. No message is automatically sent, stored, or claimed as delivered. A direct send requires an authorized form endpoint or backend.
- Telephone, directions, official listings, and original social links are preserved.
- Existing sales figures retain the 2021 date. The original five-year sales claim is attributed to the source homepage.
- No invented listings, prices, reviews, or testimonials are added. Gallery images are presented as a lifestyle gallery, not currently available inventory.
- The original GoDaddy reCAPTCHA wording is not repeated because this implementation does not load reCAPTCHA.

## SEO and accessibility

Pre-rendered HTML, one descriptive H1, structured H2/H3 headings, title and description, canonical metadata, Open Graph, Twitter card, RealEstateAgent JSON-LD, sitemap, robots.txt, descriptive image alternatives, local fonts, WebP images, lazy loading below the opening, labelled forms, keyboard focus styles, skip link, and reduced-motion support.

## Implementation note for your application

Built with React, Vite, and custom CSS. I reorganized the homepage around an architectural photo hero and a compact experience panel, bringing the location, agent identity, and key results into a clearer hierarchy. The layout adapts to desktop, tablet, and mobile while retaining the original content and imagery. Images are compressed to WebP, and the production homepage is pre-rendered to HTML for faster access to content and better crawlability.

Review and personalize the implementation note before using it. Be prepared to explain the code and your own design choices.
