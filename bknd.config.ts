import type { CloudflareBkndConfig } from "bknd/adapter/cloudflare";
import { hybrid, type HybridMode } from "bknd/modes";
import { devFsWrite } from "bknd/adapter/cloudflare";

export default hybrid({
   typesFilePath: "bknd-types.d.ts",
   configFilePath: "appconfig.json",
   writer: devFsWrite,
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
