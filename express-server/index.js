import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/userRoutes.js";
import { doctorRouter } from "./routes/doctorRoutes.js";
import { appointmentRouter } from "./routes/appointmentRoutes.js";
import { reviewRouter } from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_URL, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => console.log(`MongoDB connection error: ${error.message}`));
  
  
app.use("/api/appoint/webhook", express.raw({ type: "*/*" }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/test", (req, res) => {
  res.send("Hello World! I am here.....");
});

app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);
app.use("/api/appoint", appointmentRouter);
app.use("/api/review", reviewRouter);
