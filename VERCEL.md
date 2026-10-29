# Deploy to Vercel

1. Push this project folder to your Git repository, then import it as a new Vercel project.
2. If the repository contains the parent TRIAL folder, set Root Directory to `marci-metzger`. If you upload just this project's contents, keep the repository root.
3. Use the Vite framework preset and Node.js 22.x. The included vercel.json specifies `npm ci`, `npm run build`, and `dist` output.
4. Optional: set `SITE_URL` to your final HTTPS origin, such as `https://your-domain.com`, in Production and Preview settings. Without it, builds use Vercel's production domain variable. Enable automatic system environment variables in Vercel if disabled. The build fails on Vercel if no production origin is available.
5. Deploy. For a custom domain, connect it in Vercel Domains, follow the provided DNS instructions, set SITE_URL to the preferred domain, and redeploy.

The build generates canonical, Open Graph, structured-data, robots and sitemap URLs for the production domain. Preview builds use `noindex, follow`. Preview protection can also be enabled in Vercel. Keep production publicly accessible if you want search engines to crawl it.

This is a static, pre-rendered homepage with hash-section navigation. Unknown paths intentionally return a 404; there is no catch-all rewrite that would turn missing URLs into duplicate homepages. Hashed JS/CSS assets have immutable caching; unversioned photos use hosting defaults. No server, database, API keys or runtime secrets are required.

## Verify after deployment

- Check the homepage, mobile navigation, slideshow, gallery and count-up statistics.
- Check `/robots.txt`, `/sitemap.xml`, page-source canonical and JSON-LD for your production domain.
- Visit a nonexistent path and verify the response is HTTP 404.
- Confirm preview deployments have a noindex meta tag and production does not.
- Verify the production domain in Google Search Console and submit `/sitemap.xml`.

The enquiry form prepares a message and hands off to the original site/SMS. Search links to existing listings. Direct form delivery and a live MLS integration are not implemented. No hosting account was connected and no Vercel deployment was created by preparing these files.

References: https://vercel.com/docs/frameworks/frontend/vite and https://vercel.com/docs/project-configuration/vercel-json
