"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const wishlist_service_1 = require("./wishlist.service");
const createWishlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.user.toString();
        const bookId = req.body.book;
        const wishlistData = {
            user: userId,
            book: bookId,
        };
        const result = yield wishlist_service_1.WishlistService.createWishlist(wishlistData);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Successfully added to wishlist",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getWishlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        const result = yield wishlist_service_1.WishlistService.getWishlist(user);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "wishlist retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteWishlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.user.toString();
        const itemId = req.body.id;
        const wishlistData = {
            user: userId,
            _id: itemId,
        };
        const result = yield wishlist_service_1.WishlistService.deleteWishlist(wishlistData);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Successfully deleted to wishlist item",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.WishlistController = {
    createWishlist,
    getWishlist,
    deleteWishlist,
};
