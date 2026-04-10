import { PostsQueryParams } from "../models/posts-models";
import { postsCollection } from "./posts-repo";
import { postsMapper } from "../mappers/posts-mapper";
import { ObjectId } from "mongodb";

export const postsQueryRepository = {
  async getAllPosts(query: PostsQueryParams) {
    const sortDirection = query.sortDirection === "asc" ? 1 : -1;
    const pageSize = query.pageSize ? Number(query.pageSize) : 10;
    const pageNumber = query.pageNumber ? Number(query.pageNumber) : 1;
    const sortBy = query.sortBy ? query.sortBy : "createdAt";

    const skip = (pageNumber - 1) * pageSize;

    const totalCount = await postsCollection.countDocuments();
    const pagesCount = Math.ceil(totalCount / pageSize);

    const items = await postsCollection
      .find()
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    return {
      pagesCount: pagesCount,
      page: pageNumber,
      pageSize: pageSize,
      totalCount: totalCount,
      items: items.map(postsMapper),
    };
  },

  async getPostById(id: string) {
    if (!ObjectId.isValid(id)) return null;

    const post = await postsCollection.findOne({ _id: new ObjectId(id) });

    if (!post) return null;

    return postsMapper(post);
  },
};
