import {
  PostDbModel,
  PostInputModel,
  PostsQueryParams,
} from "../models/posts-models";
import { postsQueryRepository } from "../repositories/posts-q-repo";
import { ObjectId } from "mongodb";
import { blogsCollection } from "../../blogs/repository/blogs-repo";
import { BlogDbModel } from "../../blogs/models/blogs-models";
import { postsCollection, postsRepository } from "../repositories/posts-repo";
import { postsMapper } from "../mappers/posts-mapper";
import {
  CommentatorInfo,
  CommentDbModel,
  CommentInputModel,
} from "../../comments/models/comments-models";
import { ResultStatus } from "../../common/result/result-code";
import { commentsMapper } from "../../comments/mappers/comments-mapper";

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

  async createCommentForPost(
    postId: string,
    userId: string,
    userLogin: string,
    data: CommentInputModel,
  ) {
    const postFromDb = await postsCollection.findOne({
      _id: new ObjectId(postId),
    });

    if (!postFromDb) {
      return {
        status: ResultStatus.NotFound,
        errorMessage: "NotFound",
        extensions: [
          { field: "Post ID", message: "Post with this ID does not exist" },
        ],
        data: null,
      };
    }

    const newComment: CommentDbModel = {
      _id: new ObjectId(),
      postId: postId,
      content: data.content,
      commentatorInfo: { userId: userId, userLogin: userLogin },
      createdAt: new Date().toISOString(),
    };

    const createdComment =
      await postsRepository.createCommentForPost(newComment);

    return {
      status: ResultStatus.Success,
      extensions: [],
      data: commentsMapper(createdComment),
    };
  },
};
