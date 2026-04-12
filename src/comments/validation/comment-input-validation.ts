import { body } from "express-validator";

export const commentInputValidation = body("content")
  .isString()
  .withMessage("Name should be a string")
  .trim()
  .isLength({ min: 20, max: 300 })
  .withMessage("Incorrect length");
