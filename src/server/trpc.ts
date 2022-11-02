import { Context } from "./context";
import { initTRPC } from '@trpc/server';
import SuperJSON from "superjson";
import { ZodError } from "zod";

const t = initTRPC.context<Context>().create({
    transformer: SuperJSON,
    errorFormatter({ shape, error }: { shape: any, error: any }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.code === 'BAD_REQUEST' &&
                        error.cause instanceof ZodError
                        ? error.cause.flatten()
                        : null,
            },
        };
    }
})

export const router = t.router;

export const publicProcedure = t.procedure;

export const middleware = t.middleware;

export const margeRouters = t.mergeRouters;