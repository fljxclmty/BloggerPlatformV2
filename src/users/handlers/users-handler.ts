import { Request, Response } from "express";
import { HttpStatus } from "../../common/statuses";
import { usersService } from "../application/users-service";

export const usersHandler = {
  async createUserByAdmin(req: Request, res: Response) {
    try {
      const result = await usersService.createUserByAdmin(req.body);

      // Проверяем наличие объекта error внутри результата
      if (result.error) {
        return res.status(HttpStatus.BadRequest).send({
          errorsMessages: [
            {
              field: result.error.field,
              message: result.error.message,
            },
          ],
        });
      }

      // Если ошибки нет, возвращаем созданного пользователя (из поля user)
      res.status(HttpStatus.Created).send(result.user);
    } catch (e) {
      console.error(e);
      res.sendStatus(HttpStatus.InternalServerError);
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      const isDeleted = await usersService.deleteUser(req.params.id);

      if (!isDeleted) {
        return res.sendStatus(HttpStatus.NotFound);
      }

      return res.sendStatus(HttpStatus.NoContent);
    } catch (e) {
      console.error(e);
      res.sendStatus(HttpStatus.InternalServerError);
    }
  },
};
