import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exception/http.exception";
import { TokenService } from "../../modules/token/token.service";
import { UserRepository } from "../../modules/user/user.repository";

interface AuthJwtDependencies {
  repo: UserRepository;
  tokenService: TokenService;
}

export const authJwtMiddleware = ({
  repo,
  tokenService,
}: AuthJwtDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new HttpException(401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new HttpException(401, "Unauthorized");
    }

    const decoded = await tokenService.verifyAccessToken(token);
    const user = await repo.findOneById(decoded.id);

    if (!user) {
      throw new HttpException(401, "Unauthorized");
    }

    req.user = user;
    next();
  };
};
