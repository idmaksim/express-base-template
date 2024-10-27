import { Router } from "express";
import { logger } from "../../common/logger/logger";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserSignInDto } from "./dto/user.sign-in.dto";
import { validateDtoMiddleware } from "../../common/middlewares/validation.middleware";
import { UserSignUpDto } from "./dto/user.sign-up.dto";
import { TokenService } from "../token/token.service";
import { UserService } from "../user/user.service";
import { UserRepository } from "../user/user.repository";
import asyncHandler from "express-async-handler";
import { UserRefreshDto } from "./dto/user.refresh.dto";

export const createAuthRouter = (): Router => {
  const router = Router();
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const tokenService = new TokenService();
  const authService = new AuthService(tokenService, userService);
  const authController = new AuthController(authService);

  /**
   * @swagger
   * /auth/sign-in:
   *   post:
   *     summary: Sign in
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserSignInDto'
   *     responses:
   *       200:
   *         description: Successful sign in
   */
  router.post(
    "/sign-in",
    validateDtoMiddleware(UserSignInDto),
    asyncHandler(authController.signIn.bind(authController))
  );

  /**
   * @swagger
   * /auth/sign-up:
   *   post:
   *     summary: Sign up
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserSignUpDto'
   *     responses:
   *       200:
   *         description: Successful sign up
   */
  router.post(
    "/sign-up",
    validateDtoMiddleware(UserSignUpDto),
    asyncHandler(authController.signUp.bind(authController))
  );

  /**
   * @swagger
   * /auth/refresh:
   *   post:
   *     summary: Refresh
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserRefreshDto'
   *     responses:
   *       200:
   *         description: Successful refresh
   */
  router.post(
    "/refresh",
    validateDtoMiddleware(UserRefreshDto),
    asyncHandler(authController.refresh.bind(authController))
  );

  logger.info("Auth routes initialized");

  return router;
};
