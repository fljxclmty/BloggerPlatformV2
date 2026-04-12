import { Request, Response } from "express";
import { HttpStatus } from "../../common/statuses";
import { usersQueryRepository } from "../repositories/users-q-repo";
import { PaginatorUserViewModel, UserDbModel } from "../models/users-models";
import { usersDbToMeViewMapper } from "../mappers/users-mapper";

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

  async getUserInfo(req: Request, res: Response) {
    try {
      const user: UserDbModel | null = await usersQueryRepository.findUserById(
        req.userId as string,
      );
      if (!user) return res.sendStatus(HttpStatus.NotFound);
      res.status(HttpStatus.OK).send(usersDbToMeViewMapper(user));
    } catch (e) {
      console.error(e);
      res.sendStatus(HttpStatus.InternalServerError);
    }
  },
};
