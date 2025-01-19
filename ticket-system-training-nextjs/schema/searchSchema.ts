import { z } from 'zod';

export const searchSchema = z.object({
  email: z
    .string()
    .email('有効なメールアドレスを入力してください')
    .or(z.string().length(0)),
});

export type SearchSchema = z.infer<typeof searchSchema>;
