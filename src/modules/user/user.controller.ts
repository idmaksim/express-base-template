import { UserService } from "./user.service";
import { Request, Response } from "express";
import { User } from "@prisma/client";
export class UserController {
  constructor(private readonly userService: UserService) {}

  async self(req: Request, res: Response) {
    const user = req.user as User;
    res.json(user);
  }
}
