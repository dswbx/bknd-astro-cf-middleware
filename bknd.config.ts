import type { CloudflareBkndConfig } from "bknd/adapter/cloudflare";
import { hybrid, type HybridMode } from "bknd/modes";
import { devFsWrite } from "bknd/adapter/cloudflare";

/**
 * This is using the hybrid mode, so you can adjust your config visually using the bknd admin UI.
 * You could instead use the code mode, which behaves more like traditional frameworks.
 * Learn more at https://docs.bknd.io/usage/introduction/#modes
 */
export default hybrid({
   typesFilePath: "bknd-types.d.ts",
   configFilePath: "appconfig.json",
   writer: devFsWrite,
   syncSecrets: {
      enabled: true,
      outFile: ".env.example",
      format: "env",
      includeSecrets: false,
   },
   app: (env) => ({
      secrets: env,
   }),
   reader: async () => {
      return (await import("./appconfig.json").then(
         (res) => res.default
      )) as any;
   },
   onBuilt: async (app) => {
      app.registerAdminController({
         adminBasepath: "/admin",
         assetsPath: "/bknd/",
      });
   },
   options: {
      // the seed option is only executed if the database was empty
      seed: async (ctx) => {
         // create some entries
         await ctx.em.mutator("todos").insertMany([
            { title: "Learn bknd", done: true },
            { title: "Build something cool", done: false },
         ]);

         // and create a user
         await ctx.app.module.auth.createUser({
            email: "test@bknd.io",
            password: "12345678",
         });
      },
   },
} satisfies HybridMode<CloudflareBkndConfig>);
