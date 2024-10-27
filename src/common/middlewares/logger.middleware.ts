import { Request, Response, NextFunction } from "express";
import { logger } from "../logger/logger";

export const requestLoggerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, url } = req;
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    const statusCodeFirstDigit = Math.floor(statusCode / 100);
    const logMessage = `${method} ${url} ${statusCode} - ${duration}ms`;
    switch (statusCodeFirstDigit) {
      case 2:
        logger.info(logMessage);
        break;
      case 4:
        logger.warn(logMessage);
        break;
      case 5:
        logger.error(logMessage);
        break;
    }
  });
  next();
};
