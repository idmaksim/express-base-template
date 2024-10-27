import { Router } from "express";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { authJwtMiddleware } from "../../common/middlewares/auth-jwt.middleware";
import asyncHandler from "express-async-handler";

export const createUserRouter = (): Router => {
  const router = Router();
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  /**
   * @swagger
   * /user/self:
   *   get:
   *     summary: Get user information
   *     tags: [User]
   *     responses:
   *       200:
   *         description: User information
   */
  router.get(
    "/self",
    asyncHandler(authJwtMiddleware),
    asyncHandler(userController.self.bind(userController))
  );

  return router;
};
