//import { vehiclesDamage } from "data/vehicle-damage";
import { publicProcedure, router } from "server/trpc";
import { z } from 'zod';

export const rapidApiRouter = router({
    vehicleDamage: publicProcedure
        .input(z.object({
            images: z.array(z.string())
        }))
        .mutation(async ({ input }) => {
            const vehiclesDamage = [];
            for (const image of input?.images) {
                const response = await fetch('https://vehicle-damage-assessment.p.rapidapi.com/run', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Key': '6e2b5c626dmsh6e3498a12d61233p1105abjsn3385b4effa49',
                        'X-RapidAPI-Host': 'vehicle-damage-assessment.p.rapidapi.com'
                    },
                    body: JSON.stringify({
                        draw_result: true,
                        image
                    })
                });
                vehiclesDamage.push(await response.json());
            }

            return vehiclesDamage;
        })
})