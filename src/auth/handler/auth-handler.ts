import { authService } from "../application/auth-service";
import { Request, Response } from "express";
import { HttpStatus } from "../../common/statuses";

export const authHandler = {
  async login(req: Request, res: Response) {
    const { loginOrEmail, password } = req.body;

    const user = await authService.checkCredentials(loginOrEmail, password);

    if (!user) {
      return res.sendStatus(HttpStatus.Unauthorized);
    }

    return res.sendStatus(HttpStatus.NoContent);
  },
};
