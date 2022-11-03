import { publicProcedure, router } from "../trpc";
import { prisma } from 'server/prisma';
import moment from "moment";
import { PlatformCoreConfig } from '@uc-platform/platform-core/src/config/PlatformCoreConfig.js';
import { AdvertisementService } from '@uc-platform/advertisement-service-client/src/service/AdvertisementService.js';
import { AdvertisementServiceClientConfig } from '@uc-platform/advertisement-service-client/src/config/AdvertisementServiceClientConfig.js'
import { z } from 'zod';
import * as dotenv from 'dotenv';
import { observable } from "@trpc/server/observable";
import { Record } from "@prisma/client";
import { EventEmitter } from "events";
dotenv.config();

const config = new PlatformCoreConfig();

const advertisementService: AdvertisementService = new AdvertisementService(
    new AdvertisementServiceClientConfig(
        config
    )
);

const ee = new EventEmitter();

export const recordRouter = router({
    list: publicProcedure
        .input(z.object({
            limit: z.number().min(1).max(100).nullish(),
            cursor: z.number().nullish(),
            userId: z.number().positive().nullish()
        }))
        .query(async ({ input }) => {
            const limit = input?.limit || 50;
            const cursor: any  = input?.cursor;

            const where: any = {};
            if (input?.userId) {
                where['userId'] = input?.userId;
            }

            const items = await prisma.record.findMany({
                take: limit + 1,
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

            const platformIds: string[] = [];
            items?.forEach((item) => {
                if (item?.platformId) {
                    platformIds.push(item.platformId);
                }
            })

            const filter = JSON.stringify({
                where: {
                    id: {
                        inq: platformIds
                    }
                },
                extended: {
                    image: {
                        thumbs: {
                            thumbnail: [{ "Resize": [192, 146, false] }],
                        }
                    }
                },
                limit
            })

            const advertisements = await advertisementService.getAdvertisementsCarsApi().findCarsExtended('abmanagersk', filter)

            const records: any = [];
            items?.forEach((item) => {
                const advertisement = advertisements?.data?.find((ad) => ad.id === item?.platformId);
                records.push({
                    ...item,
                    image: advertisement?.image
                })
            })

            return {
                items: records,
                nextCursor,
            };
        }),
    create: publicProcedure
        .input(z.object({
            title: z.string(),
            price: z.number().min(1).positive(),
            type: z.number(),
            userId: z.number(),
            platformId: z.string().nullish()
        }))
        .mutation(async ({ input }) => {
            const days = Math.random() * (30 - 1) + 1;

            const event = prisma.record.create({
                data: {
                    title: input?.title,
                    type: input?.type,
                    price: input?.price,
                    userId: input?.userId,
                    validUntil: moment().add(days, 'days').toDate(),
                    platformId: input?.platformId
                }
            })
            return event;
        }),
    get: publicProcedure.input(z.object({
        id: z.number()
    })).query(async ({
        input
    }) => {
        const record = await prisma.record.findFirst({
            where: {
                id: input.id
            }
        });

        if (!record) {
            return null;
        }

        const pltRecord = await advertisementService.getAdvertisementsCarsApi().findCarsExtended('abmanagersk', JSON.stringify({
            where: {
                id: record.platformId
            }
        }), {
            headers: {
                'Accept-Language': 'sk',
            }
        });

        return {
            record,
            pltRecord: pltRecord.data
        };
    }),
    fastBid: publicProcedure
        .input(z.object({
            userId: z.number().positive(),
            recordId: z.number().positive(),
            price: z.number().positive(),
        }))
        .mutation(async ({ input }) => {
            const record = await prisma.record.findFirst({
                where: {
                    id: input?.recordId
                }
            })

            if (!record || record?.bidPrice >= input?.price) {
                return null;
            }

            const updatedRecord = await prisma.record.update({
                where: {
                    id: input?.recordId
                },
                data: {
                    bidPrice: input?.price
                }
            })

            ee.emit('update', updatedRecord);

            // emit updated pride
            const bid = await prisma.bid.create({
                data: {
                    price: input?.price,
                    userId: input?.userId,
                    recordId: input?.recordId,
                }
            })

            return {
                updatedRecord,
                bid
            };
        }),
    onUpdate: publicProcedure.subscription(() => {
        return observable<Record>((emit) => {
            const onUpdate = (data: Record) => emit.next(data);
            ee.on('update', onUpdate);
            return () => {
                ee.off('update', onUpdate);
            }
        })
    })
})