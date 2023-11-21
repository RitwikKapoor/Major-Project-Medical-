import express from "express";
import jwtCheck from "../middleware/jwtCheck.js";
import adminCheck from "../middleware/adminCheck.js";

import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  login,
  register,
  updateProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update", jwtCheck, updateProfile);
router.get("/getAllUsers", jwtCheck, adminCheck, getAllUsers);
router.get("/getUser/:id", jwtCheck, adminCheck, getSingleUser);
router.delete("/deleteUser", jwtCheck, adminCheck, deleteUser);

export { router as userRouter };
