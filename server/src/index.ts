import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import fastifyCorsPlugin from "@fastify/cors";
import { createContext } from "./context";
import { appRouter } from "./router";

const server = fastify({
  maxParamLength: 5000,
});

server.register(fastifyCorsPlugin, {
  // TODO: only allow from tauri app
  origin: "*",
});

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: appRouter,
    createContext,
  },
});

(async () => {
  try {
    await server.listen({ port: 1421 });
    console.log("Server listening on port 1421");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
