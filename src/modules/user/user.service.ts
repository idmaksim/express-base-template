import { NextFunction } from "express";
import { HttpException } from "../../common/exception/http.exception";
import { UserSignUp } from "../auth/dto/user.sign-up.dto";
import { PasswordService } from "../password/password.service";
import { UserRepository } from "./user.repository";
import { User } from "@prisma/client";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneByEmail(email);
    await this.ensureUserNotNull(user);
    return user as User;
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

  private async ensureUserNotNull(user: User | null) {
    if (!user) {
      throw new HttpException(404, "User not found");
    }
  }
}
