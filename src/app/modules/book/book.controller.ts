import { NextFunction, Request, Response } from "express";
import { BookService } from "./book.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IBook } from "./book.interface";

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
    const result = await BookService.getAllBooks();

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

export const BookController = {
  createBook,
  getSingleBook,
  getAllBooks,
};
