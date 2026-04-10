import express, { Express, Request, Response } from "express";
import { blogsService } from "../application/blogs-service";
import { HttpStatus } from "../../common/statuses";
import { blogsQueryRepository } from "../repository/blogs-q-repo";

export const blogsHandler = {
  async createBlog(req: Request, res: Response) {
    try {
      const newBlog = await blogsService.createBlog(req.body);
      res.status(HttpStatus.Created).send(newBlog);
    } catch (e) {
      console.error(e);
      res.sendStatus(HttpStatus.InternalServerError);
    }
  },

  async createPostForSpecificBlog(req: Request, res: Response) {
    try {
      const blog = await blogsQueryRepository.getBlogById(req.params.blogId);
      if (!blog) {
        return res.sendStatus(HttpStatus.NotFound); // Вернет 404, как хочет тест
      }

      const newPostForTheBlog = await blogsService.createPostForSpecificBlog(
        req.params.blogId,
        req.body,
      );

      res.status(HttpStatus.Created).send(newPostForTheBlog);
    } catch (e) {
      console.error(e);
      res.sendStatus(HttpStatus.InternalServerError);
    }
  },

  async updateBlog(req: Request, res: Response) {
    try {
      const isUpdated = await blogsService.updateBlog(req.params.id, req.body);
      return isUpdated
        ? res.sendStatus(HttpStatus.NoContent)
        : res.sendStatus(HttpStatus.NotFound);
    } catch (e) {
      console.error(e);
      res.sendStatus(HttpStatus.InternalServerError);
    }
  },

  async deleteBlog(req: Request, res: Response) {
    try {
      const isDeleted = await blogsService.deleteBlog(req.params.id);
      return isDeleted
        ? res.sendStatus(HttpStatus.NoContent)
        : res.sendStatus(HttpStatus.NotFound);
    } catch (e) {
      console.error(e);
      res.sendStatus(HttpStatus.InternalServerError);
    }
  },
};
