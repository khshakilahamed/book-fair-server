import ApiError from "../../../errors/ApiError";
import { IBook } from "./book.interface";
import { Book } from "./book.model";

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

const getAllBooks = async (): Promise<IBook[]> => {
  const books = await Book.find();

  return books;
};

export const BookService = { createBook, getSingleBook, getAllBooks };
