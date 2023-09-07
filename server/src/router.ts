import { initTRPC } from "@trpc/server";
import { z } from "zod";

type User = {
  id: string;
  name: string;
};

const users: Record<string, User> = {};

export const t = initTRPC.create();

export const appRouter = t.router({
  hello: t.procedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(({ input }) => {
      return `hello ${input.name}!`;
    }),

  getUserById: t.procedure
    .input(
      z.object({
        key: z.string(),
      }),
    )
    .query(({ input }) => {
      return users[input.key];
    }),

  createUser: t.procedure
    .input(
      z.object({
        name: z.string().min(3),
      }),
    )
    .mutation(({ input }) => {
      const id = Date.now().toString();
      const user: User = { id, ...input };

      users[user.id] = user;

      return user;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
