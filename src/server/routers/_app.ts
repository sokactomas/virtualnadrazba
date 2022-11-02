import { publicProcedure, router } from "../trpc";
import { recordRouter } from "./record";

export const appRouter = router({
    healthcheck: publicProcedure.query(() => 'Yay healthy!'),
    record: recordRouter,
})

export type AppRouter = typeof appRouter;