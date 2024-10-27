import * as bcrypt from "bcryptjs";

export class PasswordService {
  public static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(2);
    return bcrypt.hash(password, salt);
  }

  public static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
