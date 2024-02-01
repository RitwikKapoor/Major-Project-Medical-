import Doctor from "../models/DoctorModel.js";
import Appointment from "../models/AppointmentModel.js";
import mongoose from "mongoose";

export const bookAppointment = async (req, res) => {
  const { date, time } = req.body;
  try {
    const part = date.split("-");
    const formattedDate = `${part[2]}-${part[1]}-${part[0]}`;
    const appointment = await Appointment({
      date: formattedDate,
      time,
      doctorId: req.params.id,
      userId: req.locals,
    });
    const result = await appointment.save();
    return res.status(201).send({ msg: "Appointment Booked" });
  } catch (err) {
    res.status(500).send({ msg: "Unable to book appointment" });
  }
};

export const getUserAppointments = async (req, res) => {
  try {
    const app = await Appointment.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.locals),
        },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "doctorId",
          foreignField: "_id",
          as: "userinfo",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userinfo.0.userId",
          foreignField: "_id",
          as: "userinfo",
        },
      },
      {
        $project: {
          date: 1,
          time: 1,
          name: {
            $concat: [
              {
                $arrayElemAt: ["$userinfo.firstname", 0],
              },
              " ",
              {
                $arrayElemAt: ["$userinfo.lastname", 0],
              },
            ],
          },
          _id: 0,
        },
      },
    ]);

    res.status(200).json(app);
  } catch (err) {
    console.error(err);
    res.status(500).send("Unable to get all appointments");
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const app = await Doctor.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.locals),
        },
      },
      {
        $lookup: {
          from: "appointments",
          localField: "_id",
          foreignField: "doctorId",
          as: "appoint",
        },
      },
      {
        $unwind: {
          path: "$appoint",
        },
      },
      {
        $replaceRoot: {
          newRoot: "$appoint",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userinfo",
        },
      },
      {
        $set: {
          userinfo: {
            $concat: [
              {
                $first: "$userinfo.firstname",
              },
              " ",
              {
                $first: "$userinfo.lastname",
              },
            ],
          },
        },
      },
      {
        $project: {
          date: 1,
          time: 1,
          name: "$userinfo",
          _id: 0,
        },
      },
    ]);

    res.status(200).json(app);
  } catch (err) {
    console.error(err);
    res.status(500).send("Unable to get all appointments");
  }
};
