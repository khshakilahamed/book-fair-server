import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { NextFunction, Request, Response } from "express";
import { ReadingListService } from "./readingList.service";
import { IReadingList } from "./readingList.interface";

const createReadingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.user.toString();
    const bookId = req.body.book;

    const readingData = {
      user: userId,
      book: bookId,
    };

    const result = await ReadingListService.createReadingList(readingData);

    sendResponse<IReadingList>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully added to reading list",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getReadingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.body;

    const result = await ReadingListService.getReadingList(user);

    sendResponse<IReadingList[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Reading list retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteReadingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.user.toString();
    const itemId = req.body.id;

    const ReadingData = {
      user: userId,
      _id: itemId,
    };

    const result = await ReadingListService.deleteReadingList(ReadingData);

    sendResponse<IReadingList>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully deleted to reading list item",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const ReadingListController = {
  createReadingList,
  getReadingList,
  deleteReadingList,
};
