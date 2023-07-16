import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type IBook = {
  //   _id?: ObjectId;
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
