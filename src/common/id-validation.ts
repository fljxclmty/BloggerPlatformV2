import { param } from "express-validator";

export const idValidation = param("id").isString().trim().notEmpty();
