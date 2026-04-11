import { Router } from "express";
import { blogsQueryHandler } from "../handlers/blogs-q-handler";
import { blogsHandler } from "../handlers/blogs-handler";
import { superAdminGuardMiddleware } from "../../common/super-admin-mw";
import { blogInputValidation } from "../validation/blog-input-validation";
import { inputValidationResultMiddleware } from "../../common/input-validation-result-mw";
import { idValidation } from "../../common/id-validation";
import { blogPostInputValidation } from "../validation/blog-post-input-validation";
import { blogIdValidation } from "../validation/blog-id-validation";

export const blogsRouter = Router();

blogsRouter.get("/", blogsQueryHandler.getAllBlogs);

blogsRouter.post(
  "/",
  superAdminGuardMiddleware,
  blogInputValidation,
  inputValidationResultMiddleware,
  blogsHandler.createBlog,
);

blogsRouter.get(
  "/:blogId/posts",
  blogIdValidation,
  inputValidationResultMiddleware,
  blogsQueryHandler.getAllPostsForBlogById,
);

blogsRouter.post(
  "/:blogId/posts",
  superAdminGuardMiddleware,
  blogPostInputValidation,
  inputValidationResultMiddleware,
  blogsHandler.createPostForSpecificBlog,
);

blogsRouter.get(
  "/:id",
  idValidation,
  inputValidationResultMiddleware,
  blogsQueryHandler.getBlogById,
);

blogsRouter.put(
  "/:id",
  superAdminGuardMiddleware,
  idValidation,
  blogInputValidation,
  inputValidationResultMiddleware,
  blogsHandler.updateBlog,
);

blogsRouter.delete(
  "/:id",
  superAdminGuardMiddleware,
  idValidation,
  inputValidationResultMiddleware,
  blogsHandler.deleteBlog,
);
