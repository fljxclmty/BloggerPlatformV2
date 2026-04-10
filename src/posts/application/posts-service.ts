import {
  PostDbModel,
  PostInputModel,
  PostsQueryParams,
} from "../models/posts-models";
import { postsQueryRepository } from "../repositories/posts-q-repo";
import { ObjectId } from "mongodb";
import { blogsCollection } from "../../blogs/repository/blogs-repo";
import { BlogDbModel } from "../../blogs/models/blogs-models";
import { postsRepository } from "../repositories/posts-repo";
import { postsMapper } from "../mappers/posts-mapper";

export const postsService = {
  async createPost(data: PostInputModel) {
    const blogFromDb = await blogsCollection.findOne({
      _id: new ObjectId(data.blogId),
    });
    if (!blogFromDb) return null;

    const newPost: PostDbModel = {
      _id: new ObjectId(),
      title: data.title,
      shortDescription: data.shortDescription,
      content: data.content,
      blogId: data.blogId,
      blogName: blogFromDb.name,
      createdAt: new Date().toISOString(),
    };

    const createdPost = await postsRepository.createPost(newPost);
    return postsMapper(createdPost);
  },

  async updatePost(id: string, data: PostInputModel) {
    return postsRepository.updatePost(id, data);
  },

  async deletePost(id: string) {
    return postsRepository.deletePost(id);
  },
};
