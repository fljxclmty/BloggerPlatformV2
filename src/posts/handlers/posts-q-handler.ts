import { Request, Response } from "express";
import { HttpStatus } from "../../common/statuses";
import { PaginatorPostViewModel, PostViewModel } from "../models/posts-models";
import { postsQueryRepository } from "../repositories/posts-q-repo";

export const postsQueryHandler = {
  async getAllPosts(req: Request, res: Response) {
    try {
      const postsWithPaging: PaginatorPostViewModel | PaginatorPostViewModel[] =
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
};
