import { UserDbModel, UserInputModel } from "../models/users-models";
import { ObjectId } from "mongodb";
import { usersRepository } from "../repositories/users-repo";
import { usersMapper } from "../mappers/users-mapper";
import { usersQueryRepository } from "../repositories/users-q-repo";

export const usersService = {
  async createUser(data: UserInputModel) {
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

    const newUser: UserDbModel = {
      _id: new ObjectId(),
      login: data.login,
      email: data.email,
      password: data.password,
      createdAt: new Date().toISOString(),
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
