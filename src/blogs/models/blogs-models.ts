import { ObjectId } from "mongodb";

export type BlogInputModel = {
  name: string;
  description: string;
  websiteUrl: string;
};

export type BlogPostInputModel = {
  title: string;
  shortDescription: string;
  content: string;
};

export type BlogViewModel = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
};

export type BlogDbModel = {
  _id: ObjectId;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
};

export type PaginatorBlogViewModel = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: BlogViewModel[];
};

export type BlogsQueryParams = {
  searchNameTerm?: string | null;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  pageNumber?: number;
  pageSize?: number;
};
