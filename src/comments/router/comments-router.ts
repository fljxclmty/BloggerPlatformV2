import { Router } from "express";
import { idValidation } from "../../common/id-validation";
import { inputValidationResultMiddleware } from "../../common/input-validation-result-mw";
import { commentsQueryHandler } from "../handlers/comments-q-handler";
import { authMiddleware } from "../../auth/middlewares/auth-middleware";
import { commentIdValidation } from "../validation/comments-id-validation";
import { commentInputValidation } from "../validation/comment-input-validation";
import { commentsHandler } from "../handlers/comments-handler";

export const commentsRouter = Router();

commentsRouter.get(
  "/:id",
  idValidation,
  inputValidationResultMiddleware,
  commentsQueryHandler.getCommentById,
);

commentsRouter.put(
  "/:commentId",
  authMiddleware,
  commentIdValidation,
  commentInputValidation,
  inputValidationResultMiddleware,
  commentsHandler.updateComment,
);

commentsRouter.delete(
  "/:commentId",
  authMiddleware,
  commentIdValidation,
  inputValidationResultMiddleware,
  commentsHandler.deleteComment,
);
