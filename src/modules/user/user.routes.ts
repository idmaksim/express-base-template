import { Router } from "express";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import passport from "passport";

export const createUserRouter = (): Router => {
  const router = Router();
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  router.get(
    "/self",
    passport.authenticate("jwt", {
      session: false,
    }),
    userController.self.bind(userController)
  );

  return router;
};
