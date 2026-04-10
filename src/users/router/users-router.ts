import { Router } from "express";
import { usersQueryHandler } from "../handlers/users-q-handler";
import { usersHandler } from "../handlers/users-handler";
import { superAdminGuardMiddleware } from "../../common/super-admin-mw";
import { inputValidationResultMiddleware } from "../../common/input-validation-result-mw";
import { userInputValidation } from "../validation/user-input-validation";
import { idValidation } from "../../common/id-validation";

export const usersRouter = Router();

usersRouter.get(
  "/",
  superAdminGuardMiddleware,
  inputValidationResultMiddleware,
  usersQueryHandler.getAllUsers,
);

usersRouter.post(
  "/",
  superAdminGuardMiddleware,
  userInputValidation,
  inputValidationResultMiddleware,
  usersHandler.createUser,
);

usersRouter.delete(
  "/:id",
  superAdminGuardMiddleware,
  idValidation,
  inputValidationResultMiddleware,
  usersHandler.deleteUser,
);
