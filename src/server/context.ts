import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

interface CreateContectOptions {}

export async function createContextInner(_opts: CreateContectOptions) {
    return {}
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>

export async function createContext(
    opts: trpcNext.CreateNextContextOptions,
): Promise<Context> {
    return await createContextInner({})
}
