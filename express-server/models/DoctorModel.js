import mongoose, { Schema } from "mongoose";

const DoctorSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
      enum: ["pending", "accepted"],
      default: "pending",
    },
    clinicAddress: {
      type: String,
      default: "",
    },
    education: {
      type: Array,
    },
    work: {
      type: Array,
    },
    bio: {
      type: String,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
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
