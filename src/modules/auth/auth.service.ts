import { HttpException } from "../../common/exception/http.exception";
import { PasswordService } from "../password/password.service";
import { TokenService } from "../token/token.service";
import { UserService } from "../user/user.service";
import { UserSignIn } from "./dto/user.sign-in.dto";
import { UserSignUp } from "./dto/user.sign-up.dto";

export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService
  ) {}

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
      uuid: user.uuid,
    });
    const refreshToken = await this.tokenService.getRefreshToken({
      uuid: user.uuid,
    });
    return { accessToken, refreshToken };
  }

  async signUp(body: UserSignUp) {
    const user = await this.userService.create(body);
    const accessToken = await this.tokenService.getAccessToken({
      uuid: user.uuid,
    });
    const refreshToken = await this.tokenService.getRefreshToken({
      uuid: user.uuid,
    });
    return { accessToken, refreshToken };
  }
}
