import { createServer, loadEnv } from "vite";
import { readFile, writeFile } from "node:fs/promises";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { render } = await server.ssrLoadModule("/src/entry-server.jsx");
  const env = { ...loadEnv('production', process.cwd(), ''), ...process.env };
  const originalOrigin = 'https://marci-metzger-pahrump-homes.purpleshore20.chatgpt.site';
  const vercelDomain = env.VERCEL_PROJECT_PRODUCTION_URL || env.VITE_VERCEL_PROJECT_PRODUCTION_URL;
  const configured = env.SITE_URL || (vercelDomain ? `https://${vercelDomain}` : undefined);
  if (env.VERCEL && !configured) throw new Error('Set SITE_URL to the production HTTPS origin in Vercel project settings.');
  const url = new URL(configured || originalOrigin);
  if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('SITE_URL must be an HTTPS origin without a path, credentials, query or fragment.');
  }
  const origin = url.origin;
  let template = (await readFile("dist/index.html", "utf8")).replaceAll(originalOrigin, origin);
  const preview = (env.VERCEL_ENV || env.VITE_VERCEL_ENV) === 'preview';
  if (preview) template = template.replace('index, follow, max-image-preview:large', 'noindex, follow');
  await writeFile(
    "dist/index.html",
    template.replace("<!--app-html-->", render()),
  );
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>\n`);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
  console.log("Pre-rendered homepage: complete, crawlable HTML.");
} finally {
  await server.close();
}
