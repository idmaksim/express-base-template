import { z } from "zod";

export const UserRefreshDto = z.object({
  refreshToken: z.string(),
});

export type UserRefresh = z.infer<typeof UserRefreshDto>;
