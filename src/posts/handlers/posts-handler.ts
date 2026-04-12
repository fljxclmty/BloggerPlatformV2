import { Request, Response } from "express";
import { HttpStatus } from "../../common/statuses";
import { postsService } from "../application/posts-service";
import { Result } from "../../common/result/result-type";
import { CommentViewModel } from "../../comments/models/comments-models";
import { ResultStatus } from "../../common/result/result-code";
import { resultCodeToHttpException } from "../../common/result/result-code-to-http";

export const postsHandler = {
  async createPost(req: Request, res: Response) {
    try {
      const newPost = await postsService.createPost(req.body);
      res.status(HttpStatus.Created).send(newPost);
    } catch (e) {
      console.error(e);
      res.sendStatus(HttpStatus.InternalServerError);
    }
  },

  async updatePost(req: Request, res: Response) {
    try {
      const isUpdated = await postsService.updatePost(req.params.id, req.body);
      return isUpdated
        ? res.sendStatus(HttpStatus.NoContent)
        : res.sendStatus(HttpStatus.NotFound);
    } catch (e) {
      console.error(e);
      res.sendStatus(HttpStatus.InternalServerError);
    }
  },

  async deletePost(req: Request, res: Response) {
    try {
      const isDeleted = await postsService.deletePost(req.params.id);
      return isDeleted
        ? res.sendStatus(HttpStatus.NoContent)
        : res.sendStatus(HttpStatus.NotFound);
    } catch (e) {
      console.error(e);
      res.sendStatus(HttpStatus.InternalServerError);
    }
  },

  async createCommentForPost(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const { userId, userLogin, body: data } = req;

      if (!userId || !userLogin) return res.sendStatus(HttpStatus.Unauthorized);

      const result = await postsService.createCommentForPost(
        postId,
        userId,
        userLogin,
        data,
      );

      // Обрабатываем бизнес-логику из Result Object
      if (result.status === ResultStatus.NotFound)
        return res
          .status(resultCodeToHttpException(result.status))
          .send(result.extensions);

      // Если всё ок
      return res.status(HttpStatus.Created).send(result.data);
    } catch (e) {
      console.error(e);
      return res.sendStatus(HttpStatus.InternalServerError);
    }
  },
};
