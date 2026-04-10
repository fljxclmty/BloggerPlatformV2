import { body, ValidationChain } from "express-validator";

const nameValidation = body("name")
  .isString()
  .withMessage("Name should be a string")
  .trim()
  .isLength({ min: 2, max: 15 })
  .withMessage("Name length incorrect");

const descriptionValidation = body("description")
  .isString()
  .withMessage("Description should be a string")
  .trim()
  .isLength({ min: 1, max: 500 })
  .withMessage("Description length incorrect");

const urlValidation = body("websiteUrl")
  .isString()
  .withMessage("URL should be a string")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("URL length incorrect")
  .isURL()
  .withMessage("You must enter a valid URL");

export const blogInputValidation: ValidationChain[] = [
  nameValidation,
  descriptionValidation,
  urlValidation,
];
