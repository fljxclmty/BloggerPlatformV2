import { Router } from "express";
import { loginInputValidation } from "../validation/login-input-validation";
import { inputValidationResultMiddleware } from "../../common/input-validation-result-mw";
import { authHandler } from "../handler/auth-handler";
import { usersQueryHandler } from "../../users/handlers/users-q-handler";
import { authMiddleware } from "../middlewares/auth-middleware";

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
