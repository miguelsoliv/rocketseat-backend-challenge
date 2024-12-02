import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().default('3333').transform(Number),
  DB_URL: z
    .string()
    .default(
      'postgresql://docker:docker@localhost:5432/rocketseat_challenge?schema=public',
    ),
});

export const env = envSchema.parse(process.env);
