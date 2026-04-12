import { ObjectId } from "mongodb";
import { PostViewModel } from "../../posts/models/posts-models";

export type CommentatorInfo = {
  userId: string;
  userLogin: string;
};

export type CommentInputModel = {
  content: string;
};

export type CommentViewModel = {
  id: string;
  content: string;
  commentatorInfo: CommentatorInfo;
  createdAt: string;
};

export type CommentDbModel = {
  _id: ObjectId;
  postId: string;
  content: string;
  commentatorInfo: CommentatorInfo;
  createdAt: string;
};

export type CommentsQueryParams = {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
};

export type PaginatorCommentViewModel = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: CommentViewModel[];
};
