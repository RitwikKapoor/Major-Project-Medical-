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
  deleteDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

router.get("/pending", jwtCheck, adminCheck, getPendingDoctorApplications);
router.get("/getAllDoctors", getAllDoctors);
router.get("/:id", getSingleDoctor);

router.post("/apply", jwtCheck, applyForDoctor);
router.put("/accept", jwtCheck, adminCheck, acceptDoctor);
router.delete("/reject", jwtCheck, adminCheck, rejectDoctor);
router.delete("/deleteDoctor", jwtCheck, adminCheck, deleteDoctor)

//nested route, id of doctor
router.use("/:id/reviews", reviewRouter);

export { router as doctorRouter };
