import { Request, Response } from "express";
import { HttpStatus } from "../../common/statuses";
import { postsService } from "../application/posts-service";
import { Result } from "../../common/result/result-type";
import { CommentViewModel } from "../../comments/models/comments-models";

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
    const postId = req.params.postId;
    const userId = req.userId;
    const userLogin = req.userLogin;
    const data = req.body;

    if (!userId || !userLogin) {
      return res.sendStatus(HttpStatus.Unauthorized);
    }

    try {
      const result = await postsService.createCommentForPost(
        postId,
        userId,
        userLogin,
        data,
      );
      return res.status(HttpStatus.OK).send(result.data);
    } catch (e) {
      console.error(e);
      res.sendStatus(HttpStatus.InternalServerError);
    }
  },
};
