import { body } from "express-validator";

export const blogPostInputValidation = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage("Invalid title length"),

  body("shortDescription")
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Invalid shortDescription length"),

  body("content")
    .isString()
    .withMessage("Content must be a string")
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage("Invalid content length"),
];
