import { publicProcedure, router } from "../trpc";
import { offerRouter } from "./offer";
import { recordRouter } from "./record";

export const appRouter = router({
    healthcheck: publicProcedure.query(() => 'Yay healthy!'),
    record: recordRouter,
    offer: offerRouter
})

export type AppRouter = typeof appRouter;