import { PostsQueryParams } from "../models/posts-models";

import { postsMapper } from "../mappers/posts-mapper";
import { ObjectId } from "mongodb";
import {
  CommentsQueryParams,
  PaginatorCommentViewModel,
} from "../../comments/models/comments-models";
import { commentsMapper } from "../../comments/mappers/comments-mapper";
import { commentsCollection, postsCollection } from "../../db/mongo-db";

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

  async getAllCommentsForPostById(
    postId: string,
    query: CommentsQueryParams,
  ): Promise<PaginatorCommentViewModel | null> {
    if (!ObjectId.isValid(postId)) return null;

    const post = await postsCollection.findOne({ _id: new ObjectId(postId) });
    if (!post) return null;

    const filter = { postId: postId };
    const sortDirection = query.sortDirection === "asc" ? 1 : -1;
    const pageSize = Number(query.pageSize) || 10;
    const pageNumber = Number(query.pageNumber) || 1;
    const sortBy = query.sortBy || "createdAt";
    const skip = (pageNumber - 1) * pageSize;

    const totalCount = await commentsCollection.countDocuments(filter);
    const pagesCount = Math.ceil(totalCount / pageSize);

    const items = await commentsCollection
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
      items: items.map(commentsMapper),
    };
  },
};
