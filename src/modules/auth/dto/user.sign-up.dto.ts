import { z } from "zod";

export const UserSignUpDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type UserSignUp = z.infer<typeof UserSignUpDto>;
