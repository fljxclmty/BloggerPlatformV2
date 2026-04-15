import { authService } from "../application/auth-service";
import { Request, Response } from "express";
import { HttpStatus } from "../../common/statuses";
import { Result } from "../../common/result/result-type";
import { ResultStatus } from "../../common/result/result-code";
import { resultCodeToHttpException } from "../../common/result/result-code-to-http";
import { UserDbModel } from "../../users/models/users-models";
import {
  RegistrationConfirmationCodeModel,
  RegistrationEmailResending,
} from "../models/auth-models";

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

  async registerUser(req: Request, res: Response) {
    const { login, password, email } = req.body;

    try {
      const result: Result<null | UserDbModel> = await authService.registerUser(
        login,
        password,
        email,
      );

      if (result.status !== ResultStatus.Success) {
        return res
          .status(resultCodeToHttpException(result.status))
          .send(result.extensions);
      }

      return res.sendStatus(HttpStatus.NoContent);
    } catch (e) {
      console.error(e);
      res.sendStatus(HttpStatus.InternalServerError);
    }
  },

  async confirmRegistration(req: Request, res: Response) {
    const data: RegistrationConfirmationCodeModel = req.body;

    try {
      const result: Result<null | boolean> =
        await authService.confirmRegistration(data.code);

      if (result.status !== ResultStatus.Success) {
        return res
          .status(resultCodeToHttpException(result.status))
          .send(result.extensions);
      }

      return res.sendStatus(HttpStatus.NoContent);
    } catch (e) {
      console.error(e);
      res.sendStatus(HttpStatus.InternalServerError);
    }
  },

  async emailConfirmationResending(req: Request, res: Response) {
    const data: RegistrationEmailResending = req.body;

    try {
      const result: Result<null | boolean> =
        await authService.emailConfirmationResending(data.email);

      if (result.status !== ResultStatus.Success) {
        return res
          .status(resultCodeToHttpException(result.status))
          .send(result.extensions);
      }

      return res.sendStatus(HttpStatus.NoContent);
    } catch (e) {
      console.error(e);
      res.sendStatus(HttpStatus.InternalServerError);
    }
  },
};
