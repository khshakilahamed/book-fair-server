import { ObjectId } from "mongoose";
import { IUser } from "../user/user.interface";
import { IBook } from "../book/book.interface";

export type IReadingList = {
  user: ObjectId | IUser;
  book: ObjectId | IBook;
};
