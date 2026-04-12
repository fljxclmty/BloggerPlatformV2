import { client } from "../../db/mongo-db";
import { PostDbModel, PostInputModel } from "../models/posts-models";
import { ObjectId } from "mongodb";
import {
  CommentDbModel,
  CommentInputModel,
} from "../../comments/models/comments-models";
import { commentsCollection } from "../../comments/repositories/comments-repo";

export const postsCollection = client.db().collection<PostDbModel>("posts");

export const postsRepository = {
  async createPost(newPost: PostDbModel) {
    await postsCollection.insertOne(newPost);
    return newPost;
  },

  async updatePost(id: string, data: PostInputModel) {
    if (!ObjectId.isValid(id)) return false;

    const result = await postsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: data.title,
          shortDescription: data.shortDescription,
          content: data.content,
          blogId: data.blogId,
        },
      },
    );

    return result.matchedCount === 1;
  },

  async deletePost(id: string) {
    if (!ObjectId.isValid(id)) return false;

    const result = await postsCollection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  },

  async createCommentForPost(newComment: CommentDbModel) {
    await commentsCollection.insertOne(newComment);
    return newComment;
  },
};
