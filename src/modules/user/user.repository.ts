import { Prisma, PrismaClient } from "@prisma/client";
import prismaClient from "../../common/prisma/client";

export class UserRepository {
  constructor(private readonly prisma: PrismaClient = prismaClient) {}

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async findOneBy(where: Prisma.UserWhereInput) {
    return this.prisma.user.findFirst({ where });
  }

  async exists(where: Prisma.UserWhereInput) {
    const user = await this.prisma.user.findFirst({
      where,
      select: { uuid: true },
    });
    return !!user;
  }
}
