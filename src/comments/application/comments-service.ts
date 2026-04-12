import { CommentInputModel } from "../models/comments-models";
import { commentsRepository } from "../repositories/comments-repo";
import { ResultStatus } from "../../common/result/result-code";
import { commentsQueryRepository } from "../repositories/comments-q-repo";

export const commentsService = {
  async updateComment(
    commentId: string,
    userId: string,
    data: CommentInputModel,
  ) {
    const comment = await commentsQueryRepository.getCommentById(commentId);

    if (!comment) {
      return {
        status: ResultStatus.NotFound,
        errorMessage: "NotFound",
        extensions: [
          {
            field: "Comment ID",
            message: "Comment with this ID does not exist",
          },
        ],
        data: null,
      };
    }

    if (comment.commentatorInfo.userId !== userId) {
      return {
        status: ResultStatus.Forbidden,
        errorMessage: "You are not the owner of this comment",
        extensions: [],
        data: null,
      };
    }

    await commentsRepository.updateComment(commentId, data);

    return { status: ResultStatus.Success, extensions: [], data: null };
  },

  async deleteComment(commentId: string) {
    const isDeleted = await commentsRepository.deleteComment(commentId);

    if (!isDeleted) {
      return {
        status: ResultStatus.NotFound,
        errorMessage: "NotFound",
        extensions: [
          {
            field: "Comment ID",
            message: "Comment with this ID does not exist",
          },
        ],
        data: null,
      };
    }

    return {
      status: ResultStatus.Success,
      extensions: [],
      data: null,
    };
  },
};
