import { BlogsQueryParams } from "../models/blogs-models";

import { ObjectId } from "mongodb";
import { blogsMapper } from "../mappers/blogs-mapper";
import {
  PaginatorPostViewModel,
  PostsQueryParams,
} from "../../posts/models/posts-models";
import { postsMapper } from "../../posts/mappers/posts-mapper";
import { blogsCollection, postsCollection } from "../../db/mongo-db";

export const blogsQueryRepository = {
  // Получение всех блогов с маппингом
  async getAllBlogs(query: BlogsQueryParams) {
    const filter = query.searchNameTerm
      ? { name: { $regex: query.searchNameTerm, $options: "i" } }
      : {};
    const sortDirection = query.sortDirection === "asc" ? 1 : -1;
    const pageSize = query.pageSize ? Number(query.pageSize) : 10;
    const pageNumber = query.pageNumber ? Number(query.pageNumber) : 1;
    const sortBy = query.sortBy ? query.sortBy : "createdAt";

    const skip = (pageNumber - 1) * pageSize;

    const totalCount = await blogsCollection.countDocuments(filter);
    const pagesCount = Math.ceil(totalCount / pageSize);

    const items = await blogsCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    return {
      pagesCount: pagesCount,
      page: pageNumber,
      pageSize: pageSize,
      totalCount: totalCount,
      items: items.map(blogsMapper),
    };
  },

  // Получение всех постов, которые относятся к определенному блогу
  async getAllPostsForBlogById(
    id: string,
    query: PostsQueryParams,
  ): Promise<PaginatorPostViewModel> {
    const filter = { blogId: id };
    const sortDirection = query.sortDirection === "asc" ? 1 : -1;
    const pageSize = query.pageSize ? Number(query.pageSize) : 10;
    const pageNumber = query.pageNumber ? Number(query.pageNumber) : 1;
    const sortBy = query.sortBy ? query.sortBy : "createdAt";

    const skip = (pageNumber - 1) * pageSize;

    const totalCount = await postsCollection.countDocuments(filter);
    const pagesCount = Math.ceil(totalCount / pageSize);

    const items = await postsCollection
      .find(filter)
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

  // Получение одного блога по ID
  async getBlogById(id: string) {
    if (!ObjectId.isValid(id)) return null;

    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });
    if (!blog) return null;

    return blogsMapper(blog);
  },
};
