import { body, ValidationChain } from "express-validator";

const titleValidation = body("title")
  .isString()
  .withMessage("Title should be a string")
  .trim()
  .isLength({ min: 1, max: 30 })
  .withMessage("Invalid length");

const shortDescValidation = body("shortDescription")
  .isString()
  .withMessage("Description must be a string")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("Invalid length");

const contentValidation = body("content")
  .isString()
  .withMessage("Content must be a string")
  .trim()
  .isLength({ min: 1, max: 1000 })
  .withMessage("Invalid length");

const blogIdValidation = body("blogId")
  .exists()
  .withMessage("Please enter blog id")
  .isString()
  .withMessage("Blog id must be a string");

export const postInputValidation: ValidationChain[] = [
  titleValidation,
  shortDescValidation,
  contentValidation,
  blogIdValidation,
];
