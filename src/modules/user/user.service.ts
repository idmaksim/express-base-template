import { NextFunction } from "express";
import { HttpException } from "../../common/exception/http.exception";
import { UserSignUp } from "../auth/dto/user.sign-up.dto";
import { PasswordService } from "../password/password.service";
import { UserRepository } from "./user.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new HttpException(404, "User not found");
    }
    return user;
  }

  async create(user: UserSignUp) {
    const exists = await this.userRepository.exists({ email: user.email });
    if (exists) {
      throw new HttpException(409, "User already exists");
    }
    const hashedPassword = await PasswordService.hashPassword(user.password);
    return this.userRepository.create({ ...user, password: hashedPassword });
  }

  async findByUuid(uuid: string) {
    const user = await this.userRepository.findOneBy({ uuid });
    if (!user) {
      throw new HttpException(404, "User not found");
    }
    return user;
  }
}
