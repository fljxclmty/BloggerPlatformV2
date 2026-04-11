import {
  MeViewModel,
  UserDbModel,
  UserViewModel,
} from "../models/users-models";

export const usersMapper = (user: UserDbModel): UserViewModel => {
  return {
    id: user._id.toString(),
    login: user.login,
    email: user.email,
    createdAt: user.createdAt,
  };
};

export const usersDbToMeViewMapper = (userDb: UserDbModel): MeViewModel => {
  return {
    email: userDb.email,
    login: userDb.login,
    userId: userDb._id.toString(),
  };
};
