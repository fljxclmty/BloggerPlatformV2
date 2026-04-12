import { ObjectId } from "mongodb";
import { commentsMapper } from "../mappers/comments-mapper";
import { commentsCollection } from "./comments-repo";

export const commentsQueryRepository = {
  async getCommentById(commentId: string) {
    if (!ObjectId.isValid(commentId)) return null;

    const comment = await commentsCollection.findOne({
      _id: new ObjectId(commentId),
    });

    if (!comment) return null;

    return commentsMapper(comment);
  },
};
