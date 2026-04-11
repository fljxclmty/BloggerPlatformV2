import { authService } from "../application/auth-service";
import { Request, Response } from "express";
import { HttpStatus } from "../../common/statuses";
import { LoginSuccessViewModel } from "../models/auth-models";

export const authHandler = {
  async loginUser(req: Request, res: Response) {
    const { loginOrEmail, password } = req.body;

    const token = await authService.loginUser(loginOrEmail, password);

    if (!token) {
      return res.sendStatus(HttpStatus.Unauthorized);
    }

    return res
      .status(HttpStatus.OK)
      .send({ accessToken: token } as LoginSuccessViewModel);
  },
};
