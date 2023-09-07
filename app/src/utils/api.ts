import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/src/types";

export const api = createTRPCReact<AppRouter>();
