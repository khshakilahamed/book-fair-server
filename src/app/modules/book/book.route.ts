import express from "express";
import { BookController } from "./book.controller";
import auth from "../../middlewares/auth";
const router = express.Router();

router.post("/", auth, BookController.createBook);
router.post("/review/:id", auth, BookController.addBookReview);
router.get("/my-books", auth, BookController.getMyBooks);
router.get("/:id", BookController.getSingleBook);
router.get("/reviews/:id", BookController.getReviews);
router.get("/", BookController.getAllBooks);
router.delete("/:id", auth, BookController.deleteBook);

export const BookRoute = router;
