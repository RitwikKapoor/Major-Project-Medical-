import express from "express";
import jwtCheck from "../middleware/jwtCheck.js";
import doctorOrAdminCheck from "../middleware/doctorOrAdminCheck.js";
import {
  bookAppointment,
  completed,
  getAllAppointments,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/book", jwtCheck, bookAppointment);
router.put("/complete", jwtCheck,completed);
router.get("/getAllAppointments", jwtCheck, doctorOrAdminCheck,getAllAppointments);

export { router as appointmentRouter };
