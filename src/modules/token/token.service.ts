import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import { JwtPayload } from "../../common/types/jwt-payload";

export class TokenService {
  async getAccessToken(payload: any) {
    return jwt.sign(payload, config.jwtAccessSecret as jwt.Secret, {
      expiresIn: "1h",
    });
  }

  async getRefreshToken(payload: any) {
    return jwt.sign(payload, config.jwtRefreshSecret as jwt.Secret, {
      expiresIn: "7d",
    });
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    return jwt.verify(
      token,
      config.jwtAccessSecret as jwt.Secret
    ) as JwtPayload;
  }

  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    return jwt.verify(
      token,
      config.jwtRefreshSecret as jwt.Secret
    ) as JwtPayload;
  }
}
