import { UserDbModel, UserInputModel } from "../models/users-models";
import { ObjectId } from "mongodb";
import { usersRepository } from "../repositories/users-repo";
import { usersMapper } from "../mappers/users-mapper";
import { usersQueryRepository } from "../repositories/users-q-repo";
import { add } from "date-fns";
import { bcryptService } from "../../common/services/bcrypt-service";
import { randomUUID } from "crypto";

export const usersService = {
  async createUserByAdmin(data: UserInputModel) {
    const userWithLogin = await usersQueryRepository.findByLoginOrEmail(
      data.login,
    );
    if (userWithLogin) {
      return {
        error: { field: "login", message: "login should be unique" },
      };
    }

    const userWithEmail = await usersQueryRepository.findByLoginOrEmail(
      data.email,
    );
    if (userWithEmail) {
      return {
        error: { field: "email", message: "email should be unique" },
      };
    }

    const passwordHash = await bcryptService.hashPassword(data.password);

    const newUser: UserDbModel = {
      _id: new ObjectId(),
      login: data.login,
      email: data.email,
      passwordHash: passwordHash,
      createdAt: new Date().toISOString(),
      emailConfirmation: {
        confirmationCode: "admin-created",
        expirationDate: new Date(),
        isConfirmed: true,
      },
    };

    const createdUser = await usersRepository.createUser(newUser);

    return {
      user: usersMapper(createdUser),
    };
  },

  async deleteUser(id: string) {
    return usersRepository.deleteUser(id);
  },
};
