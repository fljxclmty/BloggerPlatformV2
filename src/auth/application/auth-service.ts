import { usersQueryRepository } from "../../users/repositories/users-q-repo";
import jwt from "jsonwebtoken";

//node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

export const authService = {
  async loginUser(loginOrEmail: string, password: string) {
    const user = await usersQueryRepository.findByLoginOrEmail(loginOrEmail);

    if (!user || user.password !== password) return null;

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in .env file");
    }

    const token = jwt.sign({ userId: user._id.toString() }, secret, {
      expiresIn: "1h",
    });

    return token;
  },
};
