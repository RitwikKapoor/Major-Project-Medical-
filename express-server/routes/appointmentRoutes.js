import express from "express";
import jwtCheck from "../middleware/jwtCheck.js";
import userCheck from "../middleware/userCheck.js";
import doctorCheck from "../middleware/doctorCheck.js"

import {
  bookAppointment,
  getUserAppointments,
  getDoctorAppointments,
  handleStripeWebhook
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/book/:id", jwtCheck, bookAppointment);
router.get("/getUserAppointments", jwtCheck, userCheck, getUserAppointments);
router.get("/getDoctorAppointments", jwtCheck, doctorCheck, getDoctorAppointments);
router.post("/webhook", handleStripeWebhook);

export { router as appointmentRouter };
