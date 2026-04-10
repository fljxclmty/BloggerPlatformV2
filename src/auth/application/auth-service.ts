import { usersQueryRepository } from "../../users/repositories/users-q-repo";

export const authService = {
  async checkCredentials(loginOrEmail: string, password: string) {
    const user = await usersQueryRepository.findByLoginOrEmail(loginOrEmail);

    if (!user) return null;

    if (user.password !== password) return null;

    return user;
  },
};
