import User from "../models/UserModel.js";
import Doctor from "../models/DoctorModel.js";
import Appointment from "../models/AppointmentModel.js";
import Review from "../models/ReviewModel.js";

export const applyForDoctor = async (req, res) => {
  try {
    const application_already_exist = await Doctor.findOne({
      userId: req.locals,
    });
    if (application_already_exist) {
      return res.status(400).send({ msg: "Application already exists" });
    }
    const doctor = Doctor({ ...req.body, userId: req.locals });
    await doctor.save();

    return res.status(201).send({ msg: "Application submitted successfully" });
  } catch (err) {
    res.status(500).send({ msg: "Unable to submit application" });
  }
};

export const getPendingDoctorApplications = async (req, res) => {
  try {
    const pending_doctor_applications = await Doctor.find({
      status: "pending",
    })
      .select("specialization fees -_id")
      .populate({
        path: "userId",
        select: "firstname lastname email",
      });
    return res.status(200).send(pending_doctor_applications);
  } catch (err) {
    res.status(500).send({ msg: "Unable to get pending doctor applications" });
  }
};

export const acceptDoctor = async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.body.id }, { isDoctor: true });

    await Doctor.findOneAndUpdate(
      { userId: req.body.id },
      { status: "accepted" }
    );

    return res.status(200).send({ msg: "Application accepted" });
  } catch (err) {
    res.status(500).send({ msg: "Error while accepting doctor application " });
  }
};

export const rejectDoctor = async (req, res) => {
  try {
    await Doctor.findOneAndDelete({ userId: req.body.id });

    return res.status(200).send({ msg: "Application rejected" });
  } catch (error) {
    res.status(500).send({ msg: "Error while rejecting application" });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "accepted" })
      .select("specialization clinicAddress averageRating totalRating fees")
      .populate({
        path: "userId",
        select: "firstname lastname gender email photo",
      });
    return res.status(200).send(doctors);
  } catch (err) {
    return res.status(500).send({ msg: "Unable to get all doctors" });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findOneAndDelete({ _id: req.body.doctorId });
    await User.findOneAndUpdate(
      { _id: req.body.doctorUserId },
      {
        isDoctor: false,
      }
    );

    await Appointment.deleteMany({ doctorId: req.body.doctorId })
      .then((res) => {
        console.log(
          `Deleted ${res.deletedCount} appointments with doctorId '${req.body.doctorId}'.`
        );
      })
      .catch((err) => {
        console.error(err);
      });

    await Review.deleteMany({ doctorId: req.body.doctorId })
      .then((res) => {
        console.log(
          `Deleted ${res.deletedCount} reviews with doctorId '${req.body.doctorId}'.`
        );
      })
      .catch((err) => {
        console.error(err);
      });

    return res.status(200).send({ msg: "Doctor deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Unable to delete doctor" });
  }
};

export const getSingleDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .select("-password -createdAt -updatedAt")
      .populate({
        path: "userId",
        select:
          "-password -dob -isAdmin -isDoctor -createdAt -gender -updatedAt",
      })
      .populate("reviews");
    return res.status(200).send(doctor);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ msg: "Cannot fetch doctor details" });
  }
};
