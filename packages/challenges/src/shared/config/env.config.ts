import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().default('3333').transform(Number),
});

export const env = envSchema.parse(process.env);
