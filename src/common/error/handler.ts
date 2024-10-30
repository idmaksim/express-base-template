import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exception/http.exception";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  return res
    .status(500)
    .json({ error: "Internal server error", message: err.message });
};
