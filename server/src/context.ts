import { PrismaClient } from "@prisma/client";
import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

const prisma = new PrismaClient();

export function createContext({ req, res }: CreateFastifyContextOptions) {
  const user = { name: req.headers.username ?? "anonymous" };

  return { req, res, user, prisma };
}

export type Context = inferAsyncReturnType<typeof createContext>;
