import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    starttime: {
      type: String,
      required: true,
    },
    endtime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    clinicAddress: {
      type: String,
      default: "",
    },
    reviews: [{ 
      type: mongoose.Types.ObjectId, 
      ref: "Review" 
    }],
    averageRating: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;
