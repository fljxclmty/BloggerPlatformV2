import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../common/statuses";
import jwt from "jsonwebtoken";
import { usersQueryRepository } from "../../users/repositories/users-q-repo";
import { UserDbModel } from "../../users/models/users-models";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.sendStatus(HttpStatus.Unauthorized);

  const [authType, token] = authHeader.split(" ");

  if (authType !== "Bearer" || !token)
    return res.sendStatus(HttpStatus.Unauthorized);

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in .env file");
    }

    const payload = jwt.verify(token, secret) as { userId: string };

    const user: UserDbModel | null = await usersQueryRepository.findUserById(
      payload.userId,
    );

    if (!user) return res.sendStatus(HttpStatus.Unauthorized);

    req.userId = user._id.toString();
    req.userLogin = user.login;
    next();
  } catch (e) {
    console.error(e);
    res.sendStatus(HttpStatus.Unauthorized);
  }
};
