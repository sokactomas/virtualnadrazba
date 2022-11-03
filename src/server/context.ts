import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { NodeHTTPCreateContextFnOptions } from '@trpc/server/dist/adapters/node-http';
import { IncomingMessage } from 'http';
import { getSession } from 'next-auth/react';
import ws from 'ws';

interface CreateContectOptions {}

export const createContextInner = async  (opts: CreateContectOptions | NodeHTTPCreateContextFnOptions<IncomingMessage, ws>) => {
    const session = await getSession(opts);

    console.log('createContext for ', session?.user?.name ?? 'unknow user');

    return {
        session
    }
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>

export const createContext = async (
    opts: trpcNext.CreateNextContextOptions,
): Promise<Context> => {
    return await createContextInner({})
}
