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
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const book_constant_1 = require("./book.constant");
const book_model_1 = require("./book.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = yield book_model_1.Book.create(payload);
    if (!newBook) {
        throw new ApiError_1.default(400, "Book could not be created");
    }
    return newBook;
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById({ _id: id });
    if (!book) {
        throw new ApiError_1.default(400, "Book does not exist");
    }
    return book;
});
const getAllBooks = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: book_constant_1.bookSearchableFields.map((field) => ({
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
    const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};
    const books = yield book_model_1.Book.find(whereCondition)
        .populate("user")
        .sort({ createdAt: "desc" });
    return books;
});
const addBookReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { bookId, user, review } = payload;
    const isBookExist = yield book_model_1.Book.findById(bookId);
    if (!isBookExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found");
    }
    const bookReview = {
        user: new mongoose_1.default.Types.ObjectId(user),
        review,
    };
    (_a = isBookExist.reviews) === null || _a === void 0 ? void 0 : _a.push(bookReview);
    const result = yield isBookExist.save();
    return result;
});
const getReviews = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(bookId).populate("reviews.user");
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book does not found");
    }
    const { reviews } = book;
    return reviews;
});
const myBooks = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.find({ user: payload }).sort({ createdAt: "desc" });
    return result;
});
const updateBook = ({ bookId, payload, user }) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistBook = yield book_model_1.Book.findById(bookId);
    if (!isExistBook) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book does not found");
    }
    const isThisUserCreated = yield book_model_1.Book.findOne({ user: user, _id: bookId });
    if (!isThisUserCreated) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You can not update this book");
    }
    const result = yield book_model_1.Book.findOneAndUpdate({ user: user, _id: bookId }, payload, { new: true });
    return result;
});
const deleteBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, user } = payload;
    const book = yield book_model_1.Book.findOne({ user: user, _id: bookId });
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book does not found");
    }
    if (user.toString() !== (book === null || book === void 0 ? void 0 : book.user.toString())) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You cannot delete the book");
    }
    const result = yield book_model_1.Book.findOneAndDelete({ _id: bookId, user: user });
    return result;
});
exports.BookService = {
    createBook,
    getSingleBook,
    getAllBooks,
    addBookReview,
    getReviews,
    deleteBook,
    myBooks,
    updateBook,
};
