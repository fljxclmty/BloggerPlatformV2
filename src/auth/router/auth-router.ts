import { Router } from "express";
import { loginInputValidation } from "../validation/login-input-validation";
import { inputValidationResultMiddleware } from "../../common/input-validation-result-mw";
import { authHandler } from "../handler/auth-handler";

export const authRouter = Router();

authRouter.post(
  "/login",
  loginInputValidation,
  inputValidationResultMiddleware,
  authHandler.login,
);
