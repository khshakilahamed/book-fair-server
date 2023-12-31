import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app: Application = express();
import httpStatus from "http-status";
import { AuthRoute } from "./app/modules/auth/auth.route";
import morgan from "morgan";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { BookRoute } from "./app/modules/book/book.route";
import { WishlistRoute } from "./app/modules/wishlist/wishlist.route";
import { ReadingListRoute } from "./app/modules/readingList/readingList.route";

const corsOptions = {
  origin: [
    "https://book-fair-read-book.netlify.app/",
    "http://localhost:5173/",
  ],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/books", BookRoute);
app.use("/api/v1/wishlist", WishlistRoute);
app.use("/api/v1/reading-list", ReadingListRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);

// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
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

export default app;
