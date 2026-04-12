import { CommentDbModel, CommentViewModel } from "../models/comments-models";

export const commentsMapper = (comment: CommentDbModel): CommentViewModel => {
  return {
    id: comment._id.toString(),
    content: comment.content,
    commentatorInfo: comment.commentatorInfo,
    createdAt: comment.createdAt,
  };
};
