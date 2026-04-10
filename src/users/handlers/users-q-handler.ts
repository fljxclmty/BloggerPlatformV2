import { Request, Response } from "express";
import { HttpStatus } from "../../common/statuses";
import { usersQueryRepository } from "../repositories/users-q-repo";
import { PaginatorUserViewModel } from "../models/users-models";

export const usersQueryHandler = {
  async getAllUsers(req: Request, res: Response) {
    try {
      const usersWithPaging: PaginatorUserViewModel =
        await usersQueryRepository.getAllUsers(req.query);

      res.status(HttpStatus.OK).send(usersWithPaging);
    } catch (e) {
      console.error(e);

      res.sendStatus(HttpStatus.InternalServerError);
    }
  },
};
