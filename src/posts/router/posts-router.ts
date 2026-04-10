import { Router } from "express";
import { postsQueryHandler } from "../handlers/posts-q-handler";
import { postsHandler } from "../handlers/posts-handler";
import { superAdminGuardMiddleware } from "../../common/super-admin-mw";
import { postInputValidation } from "../validation/post-input-validation";
import { inputValidationResultMiddleware } from "../../common/input-validation-result-mw";
import { idValidation } from "../../common/id-validation";

export const postsRouter = Router();

postsRouter.get("/", postsQueryHandler.getAllPosts);

postsRouter.post(
  "/",
  superAdminGuardMiddleware,
  postInputValidation,
  inputValidationResultMiddleware,
  postsHandler.createPost,
);

postsRouter.get(
  "/:id",
  idValidation,
  inputValidationResultMiddleware,
  postsQueryHandler.getPostById,
);

postsRouter.put(
  "/:id",
  superAdminGuardMiddleware,
  idValidation,
  postInputValidation,
  inputValidationResultMiddleware,
  postsHandler.updatePost,
);

postsRouter.delete(
  "/:id",
  superAdminGuardMiddleware,
  idValidation,
  inputValidationResultMiddleware,
  postsHandler.deletePost,
);
