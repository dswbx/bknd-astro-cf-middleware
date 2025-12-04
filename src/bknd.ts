import type { AstroSharedContext } from "astro";
import { createApp as getBkndApp } from "bknd/adapter/cloudflare";
import config from "../bknd.config";

export { config };

export async function getApp(runtime: App.Locals["runtime"]) {
   return await getBkndApp(config, runtime);
}

export async function getApi(
   astro: AstroSharedContext,
   opts?: { mode: "static" } | { mode?: "dynamic"; verify?: boolean }
) {
   const app = await getApp(astro.locals.runtime);
   if (opts?.mode !== "static" && opts?.verify) {
      const api = app.getApi({ headers: astro.request.headers });
      await api.verifyAuth();
      return api;
   }

   return app.getApi();
}
