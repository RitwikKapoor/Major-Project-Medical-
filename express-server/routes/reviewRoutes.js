import express from "express";
import jwtCheck from "../middleware/jwtCheck.js";
import {
  createReview,
} from "../controllers/reviewController.js";

const router = express.Router({ mergeParams: true });

router.route("/").post(jwtCheck, createReview);

export { router as reviewRouter };
