import { Context } from "./context";
import { initTRPC, RootConfig, TRPCError } from '@trpc/server';
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

const isAuthed = middleware(({ next, ctx }: any) => {
    const user = ctx.session?.user;

    if (!user?.name) {
        throw new TRPCError({
            code: 'UNAUTHORIZED'
        })
    }

    return next({
        ctx: {
            user: {
                ...user,
                name: user.name
            }
        }
    });
})

export const authedProcedure = t.procedure.use(isAuthed);