import express, { Express, Request, Response } from "express";
import { HttpStatus } from "./common/statuses";
import {
  AUTH_PATHS,
  BLOG_PATHS, COMMENTS_PATHS,
  POST_PATHS,
  TESTING_PATHS,
  USERS_PATHS,
} from "./common/paths";
import { blogsRouter } from "./blogs/router/blogs-router";
import { postsRouter } from "./posts/router/posts-router";
import { usersRouter } from "./users/router/users-router";
import { testingRouter } from "./testing/testing-router";
import { authRouter } from "./auth/router/auth-router";
import {commentsRouter} from "./comments/router/comments-router";

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.status(HttpStatus.OK).send("Hello World!!!");
  });

  app.use(BLOG_PATHS, blogsRouter);
  app.use(POST_PATHS, postsRouter);
  app.use(USERS_PATHS, usersRouter);
  app.use(TESTING_PATHS, testingRouter);
  app.use(AUTH_PATHS, authRouter);
  app.use(COMMENTS_PATHS, commentsRouter)

  return app;
};
