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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_service_1 = require("./book.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const book_constant_1 = require("./book.constant");
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookData = __rest(req.body, []);
        const result = yield book_service_1.BookService.createBook(bookData);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Successfully created book",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield book_service_1.BookService.getSingleBook(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Successfully retrieved book",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, pick_1.default)(req.query, book_constant_1.bookFilterableFields);
        const result = yield book_service_1.BookService.getAllBooks(filters);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Successfully retrieved books",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const addBookReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: bookId } = req.params;
        // review & user --> user means userId
        const reviewData = __rest(req.body, []);
        const review = Object.assign({ bookId }, reviewData);
        const result = yield book_service_1.BookService.addBookReview(review);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Successfully posted review",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getReviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: bookId } = req.params;
        const result = yield book_service_1.BookService.getReviews(bookId);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Successfully retrieved review",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getMyBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.body.user;
        const result = yield book_service_1.BookService.myBooks(user);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Successfully retrieved the books",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: bookId } = req.params;
        const _a = req === null || req === void 0 ? void 0 : req.body, { user } = _a, payload = __rest(_a, ["user"]);
        const result = yield book_service_1.BookService.updateBook({
            bookId,
            payload,
            user,
        });
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Successfully updated the book",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: bookId } = req.params;
        const user = req === null || req === void 0 ? void 0 : req.body.user;
        const result = yield book_service_1.BookService.deleteBook({ bookId, user });
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Successfully deleted the book",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.BookController = {
    createBook,
    getSingleBook,
    getAllBooks,
    addBookReview,
    getReviews,
    getMyBooks,
    deleteBook,
    updateBook,
};
