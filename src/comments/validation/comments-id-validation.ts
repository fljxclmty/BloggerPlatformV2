import { param } from "express-validator";

export const commentIdValidation = param("commentId").trim().notEmpty();
