import { body, ValidationChain } from "express-validator";

const loginOrEmailValidation: ValidationChain = body("loginOrEmail")
  .isString()
  .trim()
  .notEmpty()
  .withMessage("Login or email is required");

const passwordAuthValidation: ValidationChain = body("password")
  .isString()
  .trim()
  .notEmpty()
  .withMessage("Password is required");

export const loginInputValidation: ValidationChain[] = [
  loginOrEmailValidation,
  passwordAuthValidation,
];
