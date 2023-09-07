import { initTRPC } from "@trpc/server";
import { z } from "zod";
import type { Context } from "./context";

export const t = initTRPC.context<Context>().create();

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

  // getPosts: t.procedure.query(({ ctx }) => {
  //   // return ctx.prisma.post.findMany();
  // }),

  // getPostById: t.procedure
  //   .input(
  //     z.object({
  //       id: z.number(),
  //     }),
  //   )
  //   .query(({ ctx, input }) => {
  //     // return ctx.prisma.post.findFirst({
  //     //   where: {
  //     //     id: input.id,
  //     //   },
  //     // });
  //   }),

  // createPost: t.procedure
  //   .input(
  //     z.object({
  //       title: z.string().min(3),
  //       content: z.string().min(3),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     // await ctx.prisma.post.create({
  //     //   data: {
  //     //     title: input.title,
  //     //     content: input.content,
  //     //   },
  //     // });
  //   }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
