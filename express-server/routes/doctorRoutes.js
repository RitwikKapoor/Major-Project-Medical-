import express from "express";
import jwtCheck from "../middleware/jwtCheck.js";
import adminCheck from "../middleware/adminCheck.js";
import { reviewRouter } from "../routes/reviewRoutes.js";
import {
  applyForDoctor,
  acceptDoctor,
  rejectDoctor,
  getAllDoctors,
  getPendingDoctorApplications,
  getSingleDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

//nested route, id of doctor
router.use("/:id/reviews", reviewRouter);

router.post("/apply", jwtCheck, applyForDoctor);
router.put("/accept", jwtCheck, adminCheck, acceptDoctor);
router.put("/reject", jwtCheck, adminCheck, rejectDoctor);
router.get("/:id", getSingleDoctor);
router.get("/getAllDoctors", getAllDoctors);
router.get("/getPending", jwtCheck, adminCheck, getPendingDoctorApplications);

export { router as doctorRouter };
