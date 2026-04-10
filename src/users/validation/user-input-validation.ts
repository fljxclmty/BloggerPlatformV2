import { body, ValidationChain } from "express-validator";
import { usersQueryRepository } from "../repositories/users-q-repo";

const loginValidation: ValidationChain = body("login")
  .isString()
  .withMessage("Login should be a string")
  .trim()
  .isLength({ min: 3, max: 10 })
  .withMessage("Invalid length")
  .matches(/^[a-zA-Z0-9_-]*$/)
  .withMessage("Invalid pattern");

const passwordValidation: ValidationChain = body("password")
  .isString()
  .withMessage("Password must be a string")
  .trim()
  .isLength({ min: 6, max: 20 })
  .withMessage("Invalid length");

const emailValidation: ValidationChain = body("email")
  .isString()
  .withMessage("Email must be a string")
  .trim()
  .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
  .withMessage("Invalid email format");

export const userInputValidation: ValidationChain[] = [
  loginValidation,
  passwordValidation,
  emailValidation,
];
