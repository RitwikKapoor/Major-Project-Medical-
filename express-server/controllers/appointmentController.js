import User from "../models/UserModel.js";
import Appointment from "../models/AppointmentModel.js";

export const bookAppointment = async (req, res) => {
  const { date, time, doctorId } = req.body;

  try {
    const appointment = await Appointment({
      date,
      time,
      doctorId,
      userId: req.locals,
    });
    const result = await appointment.save();
    return res.status(201).send("Appointment Booked");
  } catch (err) {
    res.status(500).send("Unable to book appointment");
  }
};

export const completed = async (req, res) => {
  try {
    await Appointment.findOneAndUpdate(
      {
        _id: req.body.appointmentId,
      },
      { status: "completed" }
    );
    return res.status(201).send("Appointment completed");
  } catch (err) {
    res.status(500).send("Unable to complete appointment");
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [{ userId: req.query.search }, { doctorId: req.query.search }],
        }
      : {};

    const appointments = await Appointment.find(keyword)
      .populate({ path: "doctorId", select: "-password" })
      .populate({ path: "userId", select: "-password" });
    return res.send(appointments);
  } catch (err) {
    res.status(500).send("Unable to get all apponintments");
  }
};
