import { Model, ObjectId, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type IBook = {
  _id?: ObjectId;
  title: string;
  genre: string;
  publicationDate: string;
  author: string;
  price: number;
  image: string;
  user: Types.ObjectId | IUser;
  reviews?: {
    user: Types.ObjectId | IUser;
    review: string;
  }[];
};

export type BookModel = {
  isBookExist(email: string): Promise<IBook>;
} & Model<IBook>;

export type IBookFilters = {
  searchTerm?: string;
  minPrice?: string;
  maxPrice?: string;
};

export interface IBookReview {
  bookId: string;
  user: string;
  review: string;
}
