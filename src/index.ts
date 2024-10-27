import express from "express";
import { Request, Response, Express } from "express";
import { config } from "./config/config";
import { requestLoggerMiddleware } from "./common/middlewares/logger.middleware";
import { errorHandler } from "./common/error/handler";
import prismaClient from "./common/prisma/client";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { createAuthRouter } from "./modules/auth/auth.routes";
import passport from "passport";
import { configurePassport } from "./modules/auth/strategies/jwt.strategy";

async function initRoutes(app: Express) {
  app.use("/auth", createAuthRouter());
}

async function main() {
  const app = express();

  app.use(express.json());
  app.use(requestLoggerMiddleware);
  app.use(passport.initialize());
  app.use(cors());
  app.use(helmet());
  app.use(compression());

  await configurePassport(passport);
  await initRoutes(app);

  app.all("*", async (req: Request, res: Response) => {
    res.status(404).send({ message: "not found" });
  });

  app.use(errorHandler);

  app.listen(config.port, () => {
    console.log(`Сервер запущен на порту ${config.port}`);
  });
}

main().catch(async (error) => {
  console.error("Ошибка сервера:", error);
  await prismaClient.$disconnect();
  process.exit(1);
});
