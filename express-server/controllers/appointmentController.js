import Doctor from "../models/DoctorModel.js";
import Appointment from "../models/AppointmentModel.js";
import mongoose from "mongoose";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const bookAppointment = async (req, res) => {
  const { date, time } = req.body;
  try {
    const part = date.split("-");
    const formattedDate = `${part[2]}-${part[1]}-${part[0]}`;

    const docInfo = await Doctor.findById(req.params.id).select("fees");

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Doctor Appointment",
            },
            unit_amount: docInfo.fees * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/doctors/${req.params.id}`,
      metadata: {
        doctorId: req.params.id,
        userId: req.locals,
        date: formattedDate,
        time,   
      },
    });

    return res.status(201).send({ msg: "Appointment Booked", session });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return res.status(500).send({ msg: "Unable to book appointment" });
  }
};

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("event: ", event);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { doctorId, userId, date, time } = session.metadata;
      const appointment = await Appointment({
        date,
        time,
        doctorId,
        userId,
      });
      await appointment.save();
      res.status(200).json({ received: true }).end();
    }
  } catch (error) {
    console.error("Error handling webhook event:", error);
    res.status(400).json({ msg: "Webhook event handling failed" });
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

    return res.status(200).json(app);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Unable to get all appointments" });
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

    return res.status(200).json(app);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Unable to get all appointments" });
  }
};
