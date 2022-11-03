import { observable } from "@trpc/server/observable";
import { publicProcedure, router } from "../trpc";
import { offerRouter } from "./offer";
import { recordRouter } from "./record";

export const appRouter = router({
    healthcheck: publicProcedure.query(() => 'Yay healthy!'),
    randomNumber: publicProcedure.subscription(() => {
        return observable<number>((emit) => {
            const int = setInterval(() => {
                emit.next(Math.random());
            }, 500);
            return () => {
                clearInterval(int);
            };
        });
    }),
    record: recordRouter,
    offer: offerRouter,
})

export type AppRouter = typeof appRouter;