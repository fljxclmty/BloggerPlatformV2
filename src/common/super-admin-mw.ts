import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "./statuses";

export const superAdminGuardMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auth = req.headers.authorization;

  // 1. Проверяем наличие заголовка и типа Basic в одну строку
  if (!auth || !auth.startsWith("Basic ")) {
    return res.sendStatus(HttpStatus.Unauthorized);
  }

  // 2. Безопасно извлекаем токен
  const base64Token = auth.split(" ")[1];
  if (!base64Token) {
    return res.sendStatus(HttpStatus.Unauthorized);
  }

  // 3. Декодируем и проверяем формат (должно быть user:pass)
  const decodedCredentials = Buffer.from(base64Token, "base64").toString(
    "utf-8",
  );
  if (!decodedCredentials.includes(":")) {
    return res.sendStatus(HttpStatus.Unauthorized);
  }

  const [username, password] = decodedCredentials.split(":");

  // 4. Сверяем с ENV
  const expectedUsername = process.env.ADMIN_USERNAME || "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD || "qwerty";

  if (username !== expectedUsername || password !== expectedPassword) {
    return res.sendStatus(HttpStatus.Unauthorized);
  }

  next();
};
