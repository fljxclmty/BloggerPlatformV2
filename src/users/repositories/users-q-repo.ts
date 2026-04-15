import { UsersQueryParams } from "../models/users-models";
import { usersMapper } from "../mappers/users-mapper";
import { ObjectId } from "mongodb";
import { usersCollection } from "../../db/mongo-db";

export const usersQueryRepository = {
  async getAllUsers(query: UsersQueryParams) {
    const searchLoginTerm = query.searchLoginTerm ?? null;
    const searchEmailTerm = query.searchEmailTerm ?? null;

    const searchConditions = [];
    if (searchLoginTerm) {
      searchConditions.push({
        login: { $regex: searchLoginTerm, $options: "i" },
      });
    }
    if (searchEmailTerm) {
      searchConditions.push({
        email: { $regex: searchEmailTerm, $options: "i" },
      });
    }

    const loginAndEmailFilter =
      searchConditions.length > 0 ? { $or: searchConditions } : {};

    const sortDirection = query.sortDirection === "asc" ? 1 : -1;
    const pageSize = query.pageSize ? Number(query.pageSize) : 10;
    const pageNumber = query.pageNumber ? Number(query.pageNumber) : 1;
    const sortBy = query.sortBy ? query.sortBy : "createdAt";

    const skip = (pageNumber - 1) * pageSize;

    const totalCount =
      await usersCollection.countDocuments(loginAndEmailFilter);
    const pagesCount = Math.ceil(totalCount / pageSize);

    const items = await usersCollection
      .find(loginAndEmailFilter)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    return {
      pagesCount: pagesCount,
      page: pageNumber,
      pageSize: pageSize,
      totalCount: totalCount,
      items: items.map(usersMapper),
    };
  },

  async findByLoginOrEmail(loginOrEmail: string) {
    const user = await usersCollection.findOne({
      $or: [{ login: loginOrEmail }, { email: loginOrEmail }],
    });

    return user;
  },

  async doesUserExistsByLoginAndEmail(login: string, email: string) {
    const user = await usersCollection.findOne({
      $or: [{ login: login }, { email: email }],
    });

    return user;
  },

  async findUserById(id: string) {
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    return user;
  },
};
