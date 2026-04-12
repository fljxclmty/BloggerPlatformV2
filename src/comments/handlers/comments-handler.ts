import { Request, Response } from "express";
import { HttpStatus } from "../../common/statuses";
import { commentsService } from "../application/comments-service";
import { ResultStatus } from "../../common/result/result-code";
import { resultCodeToHttpException } from "../../common/result/result-code-to-http";

export const commentsHandler = {
  async updateComment(req: Request, res: Response) {
    try {
      const result = await commentsService.updateComment(
        req.params.commentId,
        req.body,
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

  async deleteComment(req: Request, res: Response) {
    try {
      const result = await commentsService.deleteComment(req.params.commentId);
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
