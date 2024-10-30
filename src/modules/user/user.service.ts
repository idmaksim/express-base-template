import { NextFunction } from "express";
import { HttpException } from "../../common/exception/http.exception";
import { UserSignUp } from "../auth/dto/user.sign-up.dto";
import { PasswordService } from "../password/password.service";
import { UserRepository } from "./user.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string) {
    await this.ensureExistsByEmail(email, "not-found");
    return this.userRepository.findOneByEmail(email);
  }

  async create(user: UserSignUp) {
    await this.ensureExistsByEmail(user.email, "conflict");
    const hashedPassword = await PasswordService.hashPassword(user.password);
    return this.userRepository.create({ ...user, password: hashedPassword });
  }

  async findByUuid(uuid: string) {
    await this.ensureExistsByUuid(uuid, "not-found");
    return this.userRepository.findOneByUuid(uuid);
  }

  private async ensureExistsByEmail(
    email: string,
    error: "conflict" | "not-found"
  ) {
    const exists = await this.userRepository.existsByEmail(email);
    switch (error) {
      case "conflict":
        if (exists) {
          throw new HttpException(409, "User already exists");
        }
        break;
      case "not-found":
        if (!exists) {
          throw new HttpException(404, "User not found");
        }
    }
  }

  private async ensureExistsByUuid(
    uuid: string,
    error: "not-found" | "conflict"
  ) {
    const exists = await this.userRepository.existsByUuid(uuid);
    switch (error) {
      case "not-found":
        if (!exists) {
          throw new HttpException(404, "User not found");
        }
        break;
      case "conflict":
        if (exists) {
          throw new HttpException(409, "User already exists");
        }
    }
  }
}
