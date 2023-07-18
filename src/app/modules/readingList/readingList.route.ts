import express from "express";
import auth from "../../middlewares/auth";
import { ReadingListController } from "./readingList.controller";
const router = express.Router();

router.post("/", auth, ReadingListController.createReadingList);
router.get("/", auth, ReadingListController.getReadingList);
router.delete("/", auth, ReadingListController.deleteReadingList);

export const ReadingListRoute = router;
