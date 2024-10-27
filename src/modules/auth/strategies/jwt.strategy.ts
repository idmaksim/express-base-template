import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { PassportStatic } from "passport";
import prismaClient from "../../../common/prisma/client";
import { config } from "../../../config/config";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtAccessSecret as string,
};

export const configurePassport = async (passport: PassportStatic) => {
  passport.use(
    new Strategy(options, async (jwtPayload, done) => {
      try {
        const user = await prismaClient.user.findUnique({
          where: { uuid: jwtPayload.uuid },
          select: {
            uuid: true,
            email: true,
            isActive: true,
            isBanned: true,
            createdAt: true,
            updatedAt: true,
          },
        });
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
