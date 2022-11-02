const { z } = require('zod');
const zod = require('zod');

const envSchema =  z.object({
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'production'])
})

const env = envSchema.safeParse(process.env);

if (!env.success) {
    console.error("Something went wrong", JSON.stringify(env.error.format(), null, 4));
    process.exit(1);
}

module.exports.env = env.data;