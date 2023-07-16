import mongoose, { Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../../config";
import { BookModel, IBook } from "./book.interface";

const bookSchema = new Schema<IBook, BookModel>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    genre: {
      type: String,
      required: [true, "genre is required"],
    },
    publicationDate: {
      type: String,
      required: [true, "Publication date is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviews: [
      {
        user: {
          type: Types.ObjectId,
          ref: "User",
          required: true,
        },
        review: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

bookSchema.statics.isBookExist = async function (
  id: string
): Promise<IBook | null> {
  const book = await Book.findOne({ _id: id });

  return book;
};

export const Book = mongoose.model<IBook, BookModel>("Book", bookSchema);
