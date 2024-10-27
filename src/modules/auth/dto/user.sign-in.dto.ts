import { z } from "zod";

export const UserSignInDto = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type UserSignIn = z.infer<typeof UserSignInDto>;
