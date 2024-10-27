import { AuthService } from "./auth.service";
import { UserSignIn } from "./dto/user.sign-in.dto";
import { Request, Response } from "express";
import { UserSignUp } from "./dto/user.sign-up.dto";
import { UserRefresh } from "./dto/user.refresh.dto";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signIn(req: Request, res: Response) {
    const body: UserSignIn = req.body;
    const tokens = await this.authService.signIn(body);
    res.status(200).send({ ...tokens });
  }

  async signUp(req: Request, res: Response) {
    const body: UserSignUp = req.body;
    const tokens = await this.authService.signUp(body);
    res.status(200).send({ ...tokens });
  }

  async refresh(req: Request, res: Response) {
    const body: UserRefresh = req.body;
    const tokens = await this.authService.refresh(body);
    res.status(200).send({ ...tokens });
  }
}
