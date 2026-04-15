import { Router } from "express";
import { loginInputValidation } from "../validation/login-input-validation";
import { inputValidationResultMiddleware } from "../../common/input-validation-result-mw";
import { authHandler } from "../handler/auth-handler";
import { usersQueryHandler } from "../../users/handlers/users-q-handler";
import { authMiddleware } from "../middlewares/auth-middleware";
import { userInputValidation } from "../../users/validation/user-input-validation";
import { usersHandler } from "../../users/handlers/users-handler";
import { confirmationCodeValidation } from "../validation/confirmation-code-input-validation";
import { resendingValidation } from "../validation/resending-input-validation";

export const authRouter = Router();

authRouter.post(
  "/login",
  loginInputValidation,
  inputValidationResultMiddleware,
  authHandler.loginUser,
);

authRouter.get(
  "/me",
  authMiddleware,
  inputValidationResultMiddleware,
  usersQueryHandler.getUserInfo,
);

authRouter.post(
  "/registration",
  userInputValidation,
  inputValidationResultMiddleware,
  authHandler.registerUser,
);

authRouter.post(
  "/registration-confirmation",
  confirmationCodeValidation,
  inputValidationResultMiddleware,
  authHandler.confirmRegistration,
);

authRouter.post(
  "/registration-email-resending",
  resendingValidation,
  inputValidationResultMiddleware,
  authHandler.emailConfirmationResending,
);
