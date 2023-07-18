import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { IWishlist } from "./wishlist.interface";
import { WishlistService } from "./wishlist.service";
import { NextFunction, Request, Response } from "express";

const createWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.user.toString();
    const bookId = req.body.book;

    const wishlistData = {
      user: userId,
      book: bookId,
    };

    const result = await WishlistService.createWishlist(wishlistData);

    sendResponse<IWishlist>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully added to wishlist",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getWishlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body;

    const result = await WishlistService.getWishlist(user);

    sendResponse<IWishlist[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "wishlist retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.user.toString();
    const itemId = req.body.id;

    const wishlistData = {
      user: userId,
      _id: itemId,
    };

    const result = await WishlistService.deleteWishlist(wishlistData);

    sendResponse<IWishlist>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully deleted to wishlist item",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const WishlistController = {
  createWishlist,
  getWishlist,
  deleteWishlist,
};
