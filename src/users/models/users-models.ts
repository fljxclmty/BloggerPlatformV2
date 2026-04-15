import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import { add } from "date-fns";

export type UserInputModel = {
  login: string;
  password: string;
  email: string;
};

export type UserViewModel = {
  id: string;
  login: string;
  email: string;
  createdAt: string;
};

export type UserDbModel = {
  _id: ObjectId;
  login: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  emailConfirmation: {
    confirmationCode: string;
    expirationDate: Date;
    isConfirmed: boolean;
  };
};

export type PaginatorUserViewModel = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: UserViewModel[];
};

export type UsersQueryParams = {
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  pageNumber?: number;
  pageSize?: number;
  searchLoginTerm?: string | null;
  searchEmailTerm?: string | null;
};

export type MeViewModel = {
  email: string;
  login: string;
  userId: string;
};
