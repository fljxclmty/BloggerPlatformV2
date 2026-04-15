import { body, ValidationChain } from "express-validator";

export const resendingValidation: ValidationChain = body("email")
  .isString()
  .trim()
  .notEmpty()
  .withMessage("Incorrect confirmation email");
