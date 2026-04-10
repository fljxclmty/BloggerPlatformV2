import { UserDbModel, UserViewModel } from "../models/users-models";

export const usersMapper = (user: UserDbModel): UserViewModel => {
  return {
    id: user._id.toString(),
    login: user.login,
    email: user.email,
    createdAt: user.createdAt,
  };
};
