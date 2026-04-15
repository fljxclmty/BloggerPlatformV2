import { CommentInputModel } from "../models/comments-models";
import { ObjectId } from "mongodb";
import { commentsCollection } from "../../db/mongo-db";

export const commentsRepository = {
  async updateComment(commentId: string, data: CommentInputModel) {
    if (!ObjectId.isValid(commentId)) return false;

    const result = await commentsCollection.updateOne(
      { _id: new ObjectId(commentId) },
      {
        $set: {
          content: data.content,
        },
      },
    );
    return result.matchedCount === 1;
  },

  async deleteComment(id: string): Promise<boolean> {
    if (!ObjectId.isValid(id)) return false;

    const result = await commentsCollection.deleteOne({
      _id: new ObjectId(id),
    });
    return result.deletedCount === 1;
  },
};
