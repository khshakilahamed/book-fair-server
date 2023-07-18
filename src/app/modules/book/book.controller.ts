import { NextFunction, Request, Response } from "express";
import { BookService } from "./book.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IBook } from "./book.interface";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "./book.constant";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...bookData } = req.body;
    const result = await BookService.createBook(bookData);

    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully created book",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await BookService.getSingleBook(id);

    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully retrieved book",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, bookFilterableFields);
    const result = await BookService.getAllBooks(filters);

    sendResponse<IBook[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully retrieved books",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const addBookReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: bookId } = req.params;

    // review & user --> user means userId
    const { ...reviewData } = req.body;

    const review = {
      bookId,
      ...reviewData,
    };

    const result = await BookService.addBookReview(review);

    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully posted review",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: bookId } = req.params;

    const result = await BookService.getReviews(bookId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully retrieved review",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const BookController = {
  createBook,
  getSingleBook,
  getAllBooks,
  addBookReview,
  getReviews,
};
