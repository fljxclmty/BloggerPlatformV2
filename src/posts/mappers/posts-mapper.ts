import { WithId } from "mongodb";
import { PostDbModel, PostViewModel } from "../models/posts-models";

export const postsMapper = (post: WithId<PostDbModel>): PostViewModel => {
  return {
    id: post._id.toString(),
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blogId,
    blogName: post.blogName,
    createdAt: post.createdAt,
  };
};
