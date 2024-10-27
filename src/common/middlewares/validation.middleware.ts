import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validateDtoMiddleware = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }
    next();
  };
};
