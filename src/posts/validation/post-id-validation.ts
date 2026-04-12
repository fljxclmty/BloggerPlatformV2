import { param } from "express-validator";

export const postIdValidation = param("postId").trim().notEmpty();
