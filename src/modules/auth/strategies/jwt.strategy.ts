import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { PassportStatic } from "passport";
import prismaClient from "../../../common/prisma/client";
import { config } from "../../../config/config";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtAccessSecret as string,
};

export const configurePassport = async (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(options, async (jwtPayload, done) => {
      try {
        const user = await prismaClient.user.findUnique({
          where: { uuid: jwtPayload.uuid },
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
