import type { MiddlewareHandler } from "astro";
import { getApp } from "./bknd";

export const onRequest: MiddlewareHandler = async (
   { locals, request },
   next
) => {
   const pathname = new URL(request.url).pathname;

   // place your specific logic when to map the request to a bknd endpoint
   if (pathname.startsWith("/api") || pathname.startsWith("/admin")) {
      const app = await getApp(locals.runtime);
      const res = await app.fetch(request);
      if (res.status !== 404) {
         return res;
      }
   }

   return await next();
};
