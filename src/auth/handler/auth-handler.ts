import { authService } from "../application/auth-service";
import { Request, Response } from "express";
import { HttpStatus } from "../../common/statuses";
import { Result } from "../../common/result/result-type";
import { ResultStatus } from "../../common/result/result-code";
import { resultCodeToHttpException } from "../../common/result/result-code-to-http";

export const authHandler = {
  async loginUser(req: Request, res: Response) {
    const { loginOrEmail, password } = req.body;

    try {
      const result: Result<string | null> = await authService.loginUser(
        loginOrEmail,
        password,
      );

      if (result.status !== ResultStatus.Success) {
        return res
          .status(resultCodeToHttpException(result.status))
          .send(result.extensions);
      }

      return res.status(HttpStatus.OK).send({ accessToken: result.data });
    } catch (e) {
      console.error(e);
      res.sendStatus(HttpStatus.InternalServerError);
    }
  },
};
