import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { bookSearchableFields } from "./book.constant";
import { IBook, IBookFilters, IBookReview } from "./book.interface";
import { Book } from "./book.model";
import mongoose, { ObjectId, Types } from "mongoose";
import { IUser } from "../user/user.interface";

const createBook = async (payload: IBook): Promise<IBook> => {
  const newBook = await Book.create(payload);

  if (!newBook) {
    throw new ApiError(400, "Book could not be created");
  }

  return newBook;
};

const getSingleBook = async (id: string): Promise<IBook> => {
  const book = await Book.findById({ _id: id });

  if (!book) {
    throw new ApiError(400, "Book does not exist");
  }

  return book;
};

const getAllBooks = async (filters: IBookFilters): Promise<IBook[]> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        if (field === "maxPrice") {
          return { price: { $lte: value } };
        }
        if (field === "minPrice") {
          return { price: { $gte: value } };
        }

        return { [field]: value };
      }),
    });
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const books = await Book.find(whereCondition)
    .populate("user")
    .sort({ createdAt: "desc" });

  return books;
};

const addBookReview = async (payload: IBookReview) => {
  const { bookId, user, review } = payload;

  const isBookExist = await Book.findById(bookId);

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }

  const bookReview = {
    user: new mongoose.Types.ObjectId(user),
    review,
  };

  isBookExist.reviews?.push(bookReview);

  const result = await isBookExist.save();

  return result;
};

const getReviews = async (bookId: string) => {
  const book = await Book.findById(bookId).populate("reviews.user");

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book does not found");
  }

  const { reviews } = book;

  return reviews;
};

const myBooks = async (payload: string) => {
  const result = await Book.find({ user: payload }).sort({ createdAt: "desc" });

  return result;
};

interface IBookUpdate {
  bookId: string;
  payload: Partial<IBook>;
  user: string;
}

const updateBook = async ({ bookId, payload, user }: IBookUpdate) => {
  const isExistBook = await Book.findById(bookId);

  if (!isExistBook) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book does not found");
  }

  const isThisUserCreated = await Book.findOne({ user: user, _id: bookId });

  if (!isThisUserCreated) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You can not update this book");
  }

  const result = await Book.findOneAndUpdate(
    { user: user, _id: bookId },
    payload,
    { new: true }
  );

  return result;
};

const deleteBook = async (payload: { bookId: string; user: string }) => {
  const { bookId, user } = payload;

  const book = await Book.findOne({ user: user, _id: bookId });

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book does not found");
  }

  if (user.toString() !== book?.user.toString()) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You cannot delete the book");
  }

  const result = await Book.findOneAndDelete({ _id: bookId, user: user });

  return result;
};

export const BookService = {
  createBook,
  getSingleBook,
  getAllBooks,
  addBookReview,
  getReviews,
  deleteBook,
  myBooks,
  updateBook,
};
