import { readFile, access } from 'node:fs/promises';
import assert from 'node:assert/strict';

const html = await readFile('dist/index.html', 'utf8');
assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, 'Exactly one pre-rendered H1 is required');
assert.match(html, /<main[\s>]/, 'Main content must exist without running JavaScript');
assert.ok(!html.includes('<!--app-html-->'), 'Pre-render placeholder must be replaced');
assert.match(html, /<title>[^<]+<\/title>/);
assert.match(html, /name="description"\s+content="[^"]+"/);
const canonical = html.match(/rel="canonical"\s+href="([^"]+)"/)?.[1];
assert.ok(canonical?.startsWith('https://'), 'Canonical must be absolute HTTPS');
assert.ok((await readFile('dist/sitemap.xml', 'utf8')).includes(`<loc>${canonical}</loc>`));
assert.ok((await readFile('dist/robots.txt', 'utf8')).includes(`${canonical}sitemap.xml`));
const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
assert.ok(schemas.some(s => s['@type'] === 'RealEstateAgent'));
assert.ok(schemas.some(s => s['@graph']?.some(n => n['@type'] === 'WebSite')));
for (const tag of html.match(/<img\b[^>]*>/g) || []) assert.match(tag, /\balt="[^"]*"/, 'Images need alt attributes');
for (const match of html.matchAll(/(?:src|href)="(\/(?:images|fonts|assets)\/[^"?#]+)"/g)) await access(`dist${match[1]}`);
console.log('SEO checks passed: rendered content, headings, metadata, schema, canonical, sitemap, robots, image alternatives and local assets.');
