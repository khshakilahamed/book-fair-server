"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingListRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const readingList_controller_1 = require("./readingList.controller");
const router = express_1.default.Router();
router.post("/", auth_1.default, readingList_controller_1.ReadingListController.createReadingList);
router.get("/", auth_1.default, readingList_controller_1.ReadingListController.getReadingList);
router.delete("/", auth_1.default, readingList_controller_1.ReadingListController.deleteReadingList);
exports.ReadingListRoute = router;
