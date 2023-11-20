import express from "express";
import jwtCheck from "../middleware/jwtCheck.js";
import {
  createReview,
  getAllReviews,
} from "../controllers/reviewController.js";

const router = express.Router({ mergeParams: true });

router.route("/").get(getAllReviews).post(jwtCheck, createReview);

export { router as reviewRouter };
