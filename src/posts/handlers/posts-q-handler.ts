import { Request, Response } from "express";
import { HttpStatus } from "../../common/statuses";
import { PaginatorPostViewModel, PostViewModel } from "../models/posts-models";
import { postsQueryRepository } from "../repositories/posts-q-repo";
import { PaginatorCommentViewModel } from "../../comments/models/comments-models";
import { postsRepository } from "../repositories/posts-repo";

export const postsQueryHandler = {
  async getAllPosts(req: Request, res: Response) {
    try {
      const postsWithPaging: PaginatorPostViewModel =
        await postsQueryRepository.getAllPosts(req.query);
      res.status(HttpStatus.OK).send(postsWithPaging);
    } catch (e) {
      console.error(e);
      res.sendStatus(HttpStatus.InternalServerError);
    }
  },

  async getPostById(req: Request, res: Response) {
    try {
      const post: PostViewModel | null = await postsQueryRepository.getPostById(
        req.params.id,
      );
      return post
        ? res.status(HttpStatus.OK).send(post)
        : res.sendStatus(HttpStatus.NotFound);
    } catch (e) {
      console.error(e);
      res.sendStatus(HttpStatus.InternalServerError);
    }
  },

  async getAllCommentsForPostById(req: Request, res: Response) {
    try {
      const commentsWithPaging: PaginatorCommentViewModel | null =
          await postsQueryRepository.getAllCommentsForPostById(
              req.params.postId,
              req.query as any,
          );


      if (!commentsWithPaging) {
        return res.sendStatus(HttpStatus.NotFound);
      }


      return res.status(HttpStatus.OK).send(commentsWithPaging);

    } catch (e) {
      console.error(e);
      return res.sendStatus(HttpStatus.InternalServerError);
    }
  },
};
