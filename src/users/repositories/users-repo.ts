import { UserDbModel } from "../models/users-models";
import { ObjectId } from "mongodb";
import { usersCollection } from "../../db/mongo-db";

export const usersRepository = {
  async createUser(newUser: UserDbModel) {
    await usersCollection.insertOne(newUser);
    return newUser;
  },

  async deleteUser(id: string) {
    if (!ObjectId.isValid(id)) return false;

    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  },
};
