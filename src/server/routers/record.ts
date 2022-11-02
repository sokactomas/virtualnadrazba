import { publicProcedure, router } from "../trpc";
import { z } from 'zod';
import { prisma } from '~/server/prisma';

export const recordRouter = router({
    create: publicProcedure
        .input(z.object({
            title: z.string(),
            price: z.number().min(1).positive(),
            type: z.number(),
            userId: z.number(),
        }))
        .mutation(async ({ input }) => {
            console.log(input);
            const event = prisma.record.create({
                data: {
                    title: input?.title,
                    type: input?.type,
                    price: input?.price,
                    userId: input?.userId,
                }
            })
            return event;
        })
})