import mongoose, { Schema, Types } from "mongoose";
import { IWishlist } from "./wishlist.interface";

const wishlistSchema = new Schema<IWishlist>(
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

export const Wishlist = mongoose.model<IWishlist>("Wishlist", wishlistSchema);
