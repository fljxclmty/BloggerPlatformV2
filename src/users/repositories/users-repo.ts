import { UserDbModel } from "../models/users-models";
import { ObjectId } from "mongodb";
import { usersCollection } from "../../db/mongo-db";

export const usersRepository = {
  async createUser(newUser: UserDbModel) {
    console.log("--- DATABASE INSERT ATTEMPT ---");
    console.log("Collection name:", usersCollection.collectionName);
    console.log("Database name:", usersCollection.dbName); // если доступно в вашем драйвере

    const result = await usersCollection.insertOne(newUser);

    console.log("Insert result id:", result.insertedId);
    return newUser;
  },

  async deleteUser(id: string) {
    if (!ObjectId.isValid(id)) return false;

    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  },
};
