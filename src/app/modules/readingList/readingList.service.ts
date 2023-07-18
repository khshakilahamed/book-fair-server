import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IReadingList } from "./readingList.interface";
import { ReadingList } from "./readingList.model";
import { Book } from "../book/book.model";

const createReadingList = async (
  payload: IReadingList
): Promise<IReadingList> => {
  const { book } = payload;

  const isBookExist = await Book.findOne({ _id: book });
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book is not found");
  }

  const isExist = await ReadingList.findOne(payload);

  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, "Already Exist");
  }

  const result = await ReadingList.create(payload);

  if (!result) {
    throw new ApiError(400, "Reading list could not be created");
  }

  return result;
};

const getReadingList = async (
  payload: Partial<IReadingList>
): Promise<IReadingList[]> => {
  const result = await ReadingList.find({ user: payload }).populate("book");

  return result;
};

const deleteReadingList = async (payload: {
  user: string;
  _id: string;
}): Promise<IReadingList | null> => {
  const result = await ReadingList.findOneAndDelete(payload);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found to delete");
  }

  return result;
};

export const ReadingListService = {
  createReadingList,
  getReadingList,
  deleteReadingList,
};
