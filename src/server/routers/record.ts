import { publicProcedure, router } from "../trpc";
import { z } from 'zod';
import { prisma } from '~/server/prisma';
import moment from "moment";

export const recordRouter = router({
    list: publicProcedure
        .input(z.object({
            limit: z.number().min(1).max(100).nullish(),
        }))
        .query(async ({ input }) => {
            const limit = input?.limit || 50;
            return await prisma.record.findMany({
                take: limit + 1
            });
        }),
    create: publicProcedure
        .input(z.object({
            title: z.string(),
            price: z.number().min(1).positive(),
            type: z.number(),
            userId: z.number(),
        }))
        .mutation(async ({ input }) => {
            const days = Math.random() * (30 - 5) + 5;

            const event = prisma.record.create({
                data: {
                    title: input?.title,
                    type: input?.type,
                    price: input?.price,
                    userId: input?.userId,
                    validUntil: moment().add(days, 'days').toDate()
                }
            })
            return event;
        })
})