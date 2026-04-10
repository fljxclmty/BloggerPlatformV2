import express, { Express, Request, Response } from "express";
import { HttpStatus } from "../../common/statuses";
import { blogsQueryRepository } from "../repository/blogs-q-repo";
import { BlogViewModel, PaginatorBlogViewModel } from "../models/blogs-models";
import { PaginatorPostViewModel } from "../../posts/models/posts-models";

export const blogsQueryHandler = {
  async getAllBlogs(req: Request, res: Response) {
    try {
      const blogsWithPaging: PaginatorBlogViewModel | PaginatorBlogViewModel[] =
        await blogsQueryRepository.getAllBlogs(req.query);
      res.status(HttpStatus.OK).send(blogsWithPaging);
    } catch (e) {
      console.error(e);
      res.sendStatus(HttpStatus.InternalServerError);
    }
  },

  async getAllPostsForBlogById(req: Request, res: Response) {
    try {
      const blog = await blogsQueryRepository.getBlogById(req.params.blogId);

      if (!blog) {
        return res.sendStatus(HttpStatus.NotFound);
      }

      const postsWithPaging = await blogsQueryRepository.getAllPostsForBlogById(
        req.params.blogId,
        req.query,
      );

      res.status(HttpStatus.OK).send(postsWithPaging);
    } catch (e) {
      console.error(e);
      res.sendStatus(HttpStatus.InternalServerError);
    }
  },

  async getBlogById(req: Request, res: Response) {
    try {
      const blog: BlogViewModel | null = await blogsQueryRepository.getBlogById(
        req.params.id,
      );
      return blog
        ? res.status(HttpStatus.OK).send(blog)
        : res.sendStatus(HttpStatus.NotFound);
    } catch (e) {
      console.error(e);
      res.sendStatus(HttpStatus.InternalServerError);
    }
  },
};
