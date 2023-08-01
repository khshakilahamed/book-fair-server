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
exports.ReadingListService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const readingList_model_1 = require("./readingList.model");
const book_model_1 = require("../book/book.model");
const createReadingList = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { book } = payload;
    const isBookExist = yield book_model_1.Book.findOne({ _id: book });
    if (!isBookExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book is not found");
    }
    const isExist = yield readingList_model_1.ReadingList.findOne(payload);
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Already Exist");
    }
    const result = yield readingList_model_1.ReadingList.create(payload);
    if (!result) {
        throw new ApiError_1.default(400, "Reading list could not be created");
    }
    return result;
});
const getReadingList = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield readingList_model_1.ReadingList.find({ user: payload }).populate("book");
    return result;
});
const deleteReadingList = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield readingList_model_1.ReadingList.findOneAndDelete(payload);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Not found to delete");
    }
    return result;
});
exports.ReadingListService = {
    createReadingList,
    getReadingList,
    deleteReadingList,
};
