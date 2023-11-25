"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const http_status_1 = __importDefault(require("http-status"));
const auth_route_1 = require("./app/modules/auth/auth.route");
const morgan_1 = __importDefault(require("morgan"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const book_route_1 = require("./app/modules/book/book.route");
const wishlist_route_1 = require("./app/modules/wishlist/wishlist.route");
const readingList_route_1 = require("./app/modules/readingList/readingList.route");
const corsOptions = {
    origin: [
        "https://book-fair-read-book.netlify.app/",
        "http://localhost:5173/",
    ],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
// routes
app.use("/api/v1/auth", auth_route_1.AuthRoute);
app.use("/api/v1/books", book_route_1.BookRoute);
app.use("/api/v1/wishlist", wishlist_route_1.WishlistRoute);
app.use("/api/v1/reading-list", readingList_route_1.ReadingListRoute);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use(globalErrorHandler_1.default);
// handle not found route
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Not Found",
        errorMessage: [
            {
                path: req.originalUrl,
                message: "API Not Found",
            },
        ],
    });
    next();
});
exports.default = app;
