import { Request, Response } from "express";
import { HttpStatus } from "../../common/statuses";
import { CommentViewModel } from "../models/comments-models";
import { commentsQueryRepository } from "../repositories/comments-q-repo";

export const commentsQueryHandler = {
  async getCommentById(req: Request, res: Response) {
    try {
      const comment: CommentViewModel | null =
        await commentsQueryRepository.getCommentById(req.params.id);
      return comment
        ? res.status(HttpStatus.OK).send(comment)
        : res.sendStatus(HttpStatus.NotFound);
    } catch (e) {
      console.error(e);
      res.sendStatus(HttpStatus.InternalServerError);
    }
  },
};
