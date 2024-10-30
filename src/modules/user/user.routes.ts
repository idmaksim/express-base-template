import { Router } from "express";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { authJwtMiddleware } from "../../common/middlewares/auth-jwt.middleware";
import asyncHandler from "express-async-handler";
import { isActiveMiddleware } from "../../common/middlewares/is-active.middleware";

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
   *     security:
   *       - bearerAuth: true
   */
  router.get(
    "/self",
    asyncHandler(authJwtMiddleware({ repo: userRepository })),
    asyncHandler(isActiveMiddleware({ repo: userRepository })),
    asyncHandler(userController.self.bind(userController))
  );

  return router;
};
