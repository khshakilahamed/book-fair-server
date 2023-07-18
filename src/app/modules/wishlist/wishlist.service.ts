import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IWishlist } from "./wishlist.interface";
import { Wishlist } from "./wishlist.model";
import { Book } from "../book/book.model";

const createWishlist = async (payload: IWishlist): Promise<IWishlist> => {
  const { book } = payload;

  const isBookExist = await Book.findOne({ _id: book });
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book is not found");
  }
  const isExist = await Wishlist.findOne(payload);

  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, "Already Exist");
  }

  const result = await Wishlist.create(payload);

  if (!result) {
    throw new ApiError(400, "Wishlist could not be created");
  }

  return result;
};

const getWishlist = async (
  payload: Partial<IWishlist>
): Promise<IWishlist[]> => {
  const result = await Wishlist.find({ user: payload }).populate("book");

  return result;
};

const deleteWishlist = async (payload: {
  user: string;
  _id: string;
}): Promise<IWishlist | null> => {
  const result = await Wishlist.findOneAndDelete(payload);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found to delete");
  }

  return result;
};

export const WishlistService = {
  createWishlist,
  getWishlist,
  deleteWishlist,
};
