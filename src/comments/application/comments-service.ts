import { CommentInputModel } from "../models/comments-models";
import { commentsRepository } from "../repositories/comments-repo";
import { ResultStatus } from "../../common/result/result-code";

export const commentsService = {
  async updateComment(commentId: string, data: CommentInputModel) {
    const isUpdated = await commentsRepository.updateComment(commentId, data);

    if (!isUpdated) {
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
