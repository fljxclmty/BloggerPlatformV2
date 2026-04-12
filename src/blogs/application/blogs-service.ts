import {
  BlogInputModel,
  BlogPostInputModel,
  BlogViewModel,
} from "../models/blogs-models";
import { blogsQueryRepository } from "../repository/blogs-q-repo";
import { ObjectId } from "mongodb";
import { blogsRepository } from "../repository/blogs-repo";
import { blogsMapper } from "../mappers/blogs-mapper";
import { PostViewModel } from "../../posts/models/posts-models";
import { postsMapper } from "../../posts/mappers/posts-mapper";
import { Result } from "../../common/result/result-type";

export const blogsService = {
  async createBlog(data: BlogInputModel): Promise<BlogViewModel> {
    const newBlog = {
      _id: new ObjectId(),
      name: data.name,
      description: data.description,
      websiteUrl: data.websiteUrl,
      createdAt: new Date().toISOString(),
      isMembership: false,
    };

    const createdBlog = await blogsRepository.createBlog(newBlog);
    return blogsMapper(createdBlog);
  },

  async createPostForSpecificBlog(
    id: string,
    data: BlogPostInputModel,
  ): Promise<PostViewModel | null> {
    const blogFromDb = await blogsQueryRepository.getBlogById(id);

    if (!blogFromDb) {
      return null;
    }

    const newPost = {
      _id: new ObjectId(),
      title: data.title,
      shortDescription: data.shortDescription,
      content: data.content,
      blogId: id,
      blogName: blogFromDb.name,
      createdAt: new Date().toISOString(),
    };
    const createdPost =
      await blogsRepository.createPostForSpecificBlog(newPost);
    return postsMapper(createdPost);
  },

  async updateBlog(id: string, data: BlogInputModel): Promise<boolean> {
    return blogsRepository.updateBlog(id, data);
  },

  async deleteBlog(id: string): Promise<boolean> {
    return blogsRepository.deleteBlog(id);
  },
};
