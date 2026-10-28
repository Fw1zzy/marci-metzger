import { createServer } from "vite";
import { readFile, writeFile } from "node:fs/promises";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { render } = await server.ssrLoadModule("/src/entry-server.jsx");
  const template = await readFile("dist/index.html", "utf8");
  await writeFile(
    "dist/index.html",
    template.replace("<!--app-html-->", render()),
  );
  console.log("Pre-rendered homepage: complete, crawlable HTML.");
} finally {
  await server.close();
}
