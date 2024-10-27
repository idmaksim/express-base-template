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
import { createUserRouter } from "./modules/user/user.routes";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerConfig from "./config/swaggerConfig";

async function initRoutes(app: Express) {
  app.use("/auth", createAuthRouter());
  app.use("/user", createUserRouter());
}

async function main() {
  const app = express();

  app.use(express.json());
  app.use(requestLoggerMiddleware);
  app.use(cors());
  app.use(helmet());
  app.use(compression());

  await initRoutes(app);

  const swaggerDocs = swaggerJsDoc(swaggerConfig);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
