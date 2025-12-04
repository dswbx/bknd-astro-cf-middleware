// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import { devFsVitePlugin } from "bknd/adapter/cloudflare";

// https://astro.build/config
export default defineConfig({
   output: "server",
   adapter: cloudflare(),
   vite: {
      build: {
         minify: true,
      },
      plugins: [devFsVitePlugin()],
   },
});
