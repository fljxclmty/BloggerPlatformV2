import { body, ValidationChain } from "express-validator";

export const confirmationCodeValidation: ValidationChain = body("code")
  .isString()
  .trim()
  .notEmpty()
  .withMessage("Incorrect confirmation code");
