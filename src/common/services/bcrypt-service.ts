import bcrypt from "bcryptjs";

export const bcryptService = {
  async hashPassword(password: string) {
    const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
    return await bcrypt.hash(password, saltRounds);
  },

  async comparePasswords(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  },
};
