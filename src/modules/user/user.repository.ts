import { Prisma, PrismaClient } from "@prisma/client";
import prismaClient from "../../common/prisma/client";
import { UserSignIn } from "../auth/dto/user.sign-in.dto";

export class UserRepository {
  constructor(private readonly prisma: PrismaClient = prismaClient) {}

  async create(data: UserSignIn) {
    return this.prisma.user.create({ data, select: this.getUserSelect() });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: { email },
      select: this.getUserSelect(),
    });
  }

  async findOneByUuid(uuid: string) {
    return this.prisma.user.findFirst({
      where: { uuid },
      select: this.getUserSelect(),
    });
  }

  async existsByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
      select: { uuid: true },
    });
    return !!user;
  }

  async existsByUuid(uuid: string) {
    const user = await this.prisma.user.findFirst({
      where: { uuid },
      select: { uuid: true },
    });
    return !!user;
  }

  private getUserSelect(): Prisma.UserSelect {
    return {
      uuid: true,
      email: true,
      isActive: true,
      isBanned: true,
      createdAt: true,
      updatedAt: true,
    };
  }
}
