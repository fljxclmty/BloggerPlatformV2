import { blogsCollection, postsCollection } from "../../db/mongo-db";
import { BlogDbModel, BlogInputModel } from "../models/blogs-models";
import { ObjectId } from "mongodb";
import { PostDbModel } from "../../posts/models/posts-models";

export const blogsRepository = {
  async createBlog(newBlog: BlogDbModel): Promise<BlogDbModel> {
    await blogsCollection.insertOne(newBlog);
    return newBlog;
  },

  async createPostForSpecificBlog(newPost: PostDbModel) {
    await postsCollection.insertOne(newPost);
    return newPost;
  },

  async updateBlog(id: string, data: BlogInputModel): Promise<boolean> {
    if (!ObjectId.isValid(id)) return false;

    const result = await blogsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: data.name,
          description: data.description,
          websiteUrl: data.websiteUrl,
        },
      },
    );
    return result.matchedCount === 1;
  },

  async deleteBlog(id: string): Promise<boolean> {
    if (!ObjectId.isValid(id)) return false;

    const result = await blogsCollection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  },
};
