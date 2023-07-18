import express from "express";
import auth from "../../middlewares/auth";
import { WishlistController } from "./wishlist.controller";
const router = express.Router();

router.post("/", auth, WishlistController.createWishlist);
router.get("/", auth, WishlistController.getWishlist);
router.delete("/", auth, WishlistController.deleteWishlist);

export const WishlistRoute = router;
