import User from "../models/UserModel.js";
import Doctor from "../models/DoctorModel.js";

export const applyForDoctor = async (req, res) => {
  try {
    const application_already_exist = await Doctor.findOne({
      userId: req.locals,
    });
    if (application_already_exist) {
      return res.status(400).send("Application already exists");
    }
    const doctor = Doctor({ ...req.body, userId: req.locals });
    await doctor.save();

    return res.status(201).send("Application submitted successfully");
  } catch (err) {
    res.status(500).send("Unable to submit application");
  }
};

export const acceptDoctor = async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.body.id }, { isDoctor: true });

    await Doctor.findOneAndUpdate(
      { userId: req.body.id },
      { status: "accepted" }
    );

    return res.status(201).send("Application accepted");
  } catch (err) {
    res.status(500).send("Error while accepting doctor application  ");
  }
};

export const rejectDoctor = async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.body.id }, { isDoctor: false });
    await Doctor.findOneAndDelete({ userId: req.body.id });

    return res.status(201).send("Application rejected");
  } catch (error) {
    res.status(500).send("Error while rejecting application");
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findOneAndDelete({ userId: req.body.id });
    await User.findOneAndUpdate(
      { _id: req.body.id },
      {
        isDoctor: false,
      }
    );
    res.status(200).send("Doctor deleted successfully");
  } catch (err) {
    res.status(500).send("Unable to delete doctor");
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "accepted" })
      .select("specialization clinicAddress")
      .populate({
        path: "userId",
        select: "firstname lastname gender photo -_id",
      });
    return res.status(200).send(doctors);
  } catch (err) {
    res.status(500).send("Unable to get all doctors");
  }
};

export const getSingleDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .select("-password")
      .populate({
        path: "userId",
        select: "-password",
      })
      .populate("reviews");
    return res.status(200).send(doctor);
  } catch (err) {
    console.error(err)
    // res.status(500).send("Cannot fetch doctor details");
    res.status(500).send(err)
  }
};

export const getPendingDoctorApplications = async (req, res) => {
  try {
    const pending_doctor_applications = await Doctor.find({
      status: "pending",
    }).populate({
      path: "userId",
      select: "-password -isAdmin -isDoctor -Address -dob",
    });

    return res.status(200).send(pending_doctor_applications);
  } catch (err) {
    res.status(500).send("Unable to get pending doctor applications");
  }
};
