import { User } from "@prisma/client";
import { HttpException } from "../exception/http.exception";
import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../modules/user/user.repository";

interface IsActiveMiddlewareDependencies {
  repo: UserRepository;
}

export const isActiveMiddleware = ({
  repo,
}: IsActiveMiddlewareDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;
    if (!user.isActive) {
      throw new HttpException(403, "User is not active");
    }
    next();
  };
};
