import mongoose, { Schema, Types } from "mongoose";
import { IReadingList } from "./readingList.interface";

const readingListSchema = new Schema<IReadingList>(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: Types.ObjectId,
      ref: "Book",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ReadingList = mongoose.model<IReadingList>(
  "ReadingList",
  readingListSchema
);
