import { HttpException } from "../../common/exception/http.exception";
import { PasswordService } from "../password/password.service";
import { TokenService } from "../token/token.service";
import { UserService } from "../user/user.service";
import { UserRefresh } from "./dto/user.refresh.dto";
import { UserSignIn } from "./dto/user.sign-in.dto";
import { UserSignUp } from "./dto/user.sign-up.dto";

export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService
  ) {}

  async refresh(body: UserRefresh) {
    const payload = await this.tokenService.verifyRefreshToken(
      body.refreshToken
    );
    const user = await this.userService.findOneById(payload.id);
    if (!user) {
      throw new HttpException(401, "Unauthorized");
    }
    const accessToken = await this.tokenService.getAccessToken({
      id: user.id,
    });
    return { accessToken };
  }

  async signIn(body: UserSignIn) {
    const user = await this.userService.findByEmail(body.email);
    const isPasswordValid = await PasswordService.comparePassword(
      body.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new HttpException(401, "Invalid password");
    }
    const accessToken = await this.tokenService.getAccessToken({
      id: user.id,
    });
    const refreshToken = await this.tokenService.getRefreshToken({
      id: user.id,
    });
    return { accessToken, refreshToken };
  }

  async signUp(body: UserSignUp) {
    const user = await this.userService.create(body);
    const accessToken = await this.tokenService.getAccessToken({
      id: user.id,
    });
    const refreshToken = await this.tokenService.getRefreshToken({
      id: user.id,
    });
    return { accessToken, refreshToken };
  }
}
