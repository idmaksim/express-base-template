import jwt from "jsonwebtoken";
import { config } from "../../config/config";

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

  async verifyAccessToken(token: string) {
    return jwt.verify(token, config.jwtAccessSecret as jwt.Secret);
  }

  async verifyRefreshToken(token: string) {
    return jwt.verify(token, config.jwtRefreshSecret as jwt.Secret);
  }
}
