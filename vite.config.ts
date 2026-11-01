import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { articles } from "./src/data/articles";
import { tools } from "./src/data/tools";
import { buildSitemap, buildRss, buildLlmsTxt } from "./src/lib/seo-files";

// Writes sitemap.xml, rss.xml and llms.txt into the build output,
// generated from src/data so they always list every article and tool.
const seoFiles = (): Plugin => ({
  name: "seo-files",
  apply: "build",
  generateBundle() {
    this.emitFile({ type: "asset", fileName: "sitemap.xml", source: buildSitemap(articles) });
    this.emitFile({ type: "asset", fileName: "rss.xml", source: buildRss(articles) });
    this.emitFile({ type: "asset", fileName: "llms.txt", source: buildLlmsTxt(articles, tools) });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), seoFiles()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
