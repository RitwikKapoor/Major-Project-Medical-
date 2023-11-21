import mongoose from "mongoose";

const AppointmentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    doctorId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);

export default Appointment;
