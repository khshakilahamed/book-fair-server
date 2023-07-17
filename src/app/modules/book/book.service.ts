import ApiError from "../../../errors/ApiError";
import { bookSearchableFields } from "./book.constant";
import { IBook, IBookFilters } from "./book.interface";
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

export const BookService = { createBook, getSingleBook, getAllBooks };
