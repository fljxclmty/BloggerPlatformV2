import { param } from "express-validator";

export const blogIdValidation = param("blogId").trim().notEmpty();