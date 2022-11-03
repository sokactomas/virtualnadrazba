import { publicProcedure, router } from "server/trpc";
import { z } from 'zod';
import { prisma } from 'server/prisma';

export const bidRouter = router({
    list: publicProcedure
        .input(z.object({
            limit: z.number().min(1).max(100).nullish(),
            cursor: z.number().nullish(),
            userId: z.number().positive().nullish()
        }))
        .query(async ({ input }) => {
            const limit = input?.limit || 50;
            const cursor: any = input?.cursor;

            const where: any = {};
            if (input?.userId) {
                where['userId'] = input?.userId;
            }

            const items = await prisma.bid.findMany({
                take: limit + 1,
                include: {
                    record: true
                },
                where: where,
                cursor: cursor ? {
                    id: cursor
                } : undefined,
                orderBy: {
                    createdAt: 'desc',
                },
            });

            let nextCursor: typeof cursor | undefined = undefined;
            if (items.length > limit) {
                // Remove the last item and use it as next cursor

                const nextItem = items.pop()!;
                nextCursor = nextItem.id;
            }

            return {
                items: items,
                nextCursor,
            };
        })
})