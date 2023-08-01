"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoute = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/", auth_1.default, book_controller_1.BookController.createBook);
router.post("/review/:id", auth_1.default, book_controller_1.BookController.addBookReview);
router.get("/my-books", auth_1.default, book_controller_1.BookController.getMyBooks);
router.get("/:id", book_controller_1.BookController.getSingleBook);
router.get("/reviews/:id", book_controller_1.BookController.getReviews);
router.get("/", book_controller_1.BookController.getAllBooks);
router.patch("/:id", auth_1.default, book_controller_1.BookController.updateBook);
router.delete("/:id", auth_1.default, book_controller_1.BookController.deleteBook);
exports.BookRoute = router;
