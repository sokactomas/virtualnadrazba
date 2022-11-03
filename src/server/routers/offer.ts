import { publicProcedure, router } from "../trpc";
import { PlatformCoreConfig } from '@uc-platform/platform-core/src/config/PlatformCoreConfig.js';
import { AdvertisementService } from '@uc-platform/advertisement-service-client/src/service/AdvertisementService.js';
import { AdvertisementServiceClientConfig } from '@uc-platform/advertisement-service-client/src/config/AdvertisementServiceClientConfig.js'
import { z } from 'zod';
import * as dotenv from 'dotenv';
dotenv.config();

const config = new PlatformCoreConfig();

const advertisementService: AdvertisementService = new AdvertisementService(
    new AdvertisementServiceClientConfig(
        config
    )
);

export const offerRouter = router({
    get: publicProcedure
        .input(z.object({
            id: z.string(),
        }))
        .query(async ({ input }) => {
            const filter = JSON.stringify({
                where: {
                    id: input?.id
                },
                extended: {
                    image: {
                        thumbs: {
                            thumbnail: [{ "Resize": [192, 146, false] }],
                        }
                    }
                },
            });

            const items = await advertisementService.getAdvertisementsCarsApi().findCarsExtended('abmanagersk', filter)
            return items?.data?.length > 0 ? items?.data[0] : null;
        }),
    list: publicProcedure
        .input(z.object({
            userId: z.string(),
            limit: z.number().min(1).max(20).nullish()
        }))
        .query(async ({ input }) => {
            const limit = input?.limit || 20;
            const filter = JSON.stringify({
                where: {
                    userId: input?.userId,
                    businessState: 22760
                },
                extended: {
                    image: {
                        thumbs: {
                            thumbnail: [{ "Resize": [192, 146, false] }],
                        }
                    }
                },
                limit,
            });

            const items = await advertisementService.getAdvertisementsCarsApi().findCarsExtended('abmanagersk', filter)
            return items?.data || [];
        })
})