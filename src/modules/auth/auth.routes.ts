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

  router.post(
    "/sign-in",
    validateDtoMiddleware(UserSignInDto),
    asyncHandler(authController.signIn.bind(authController))
  );
  router.post(
    "/sign-up",
    validateDtoMiddleware(UserSignUpDto),
    asyncHandler(authController.signUp.bind(authController))
  );
  router.post(
    "/refresh",
    validateDtoMiddleware(UserRefreshDto),
    asyncHandler(authController.refresh.bind(authController))
  );

  logger.info("Auth routes initialized");

  return router;
};
