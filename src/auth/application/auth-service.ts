import { usersQueryRepository } from "../../users/repositories/users-q-repo";
import jwt from "jsonwebtoken";
import { Result } from "../../common/result/result-type";
import { ResultStatus } from "../../common/result/result-code";

//node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

export const authService = {
  async loginUser(
    loginOrEmail: string,
    password: string,
  ): Promise<Result<string | null>> {
    const user = await usersQueryRepository.findByLoginOrEmail(loginOrEmail);

    if (!user || user.password !== password) {
      return {
        status: ResultStatus.Unauthorized,
        errorMessage: "Unauthorized",
        extensions: [
          { field: "Login, email or password", message: "Wrong credentials" },
        ],
        data: null,
      };
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in .env file");
    }

    const token = jwt.sign({ userId: user._id.toString() }, secret, {
      expiresIn: "1h",
    });

    return {
      status: ResultStatus.Success,
      extensions: [],
      data: token,
    };
  },
};
