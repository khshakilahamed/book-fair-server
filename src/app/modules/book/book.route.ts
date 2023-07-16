import express from "express";
import { BookController } from "./book.controller";
const router = express.Router();

router.post("/", BookController.createBook);
router.get("/:id", BookController.getSingleBook);
router.get("/", BookController.getAllBooks);

export const BookRoute = router;
