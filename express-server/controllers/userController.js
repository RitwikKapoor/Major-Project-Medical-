import User from "../models/UserModel.js";
import Doctor from "../models/DoctorModel.js";
import Appointment from "../models/AppointmentModel.js";
import Review from "../models/ReviewModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const emailPresent = await User.findOne({ email: req.body.email });
    if (emailPresent) {
      res.status(400).send("Email already exists");
    }
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const user = await User({ ...req.body, password: hashedPass });
    const result = await user.save();
    if (!result) {
      return res.status(500).send("Unable to register user");
    }
    return res.status(201).send("User registered successfully");
  } catch (err) {
    res.status(500).send("Unable to register user");
  }
};

export const login = async (req, res) => {
  try {
    const userPresent = await User.findOne({ email: req.body.email });
    if (!userPresent) {
      return res.status(400).send("No such user, register first");
    }
    const verifyPass = await bcrypt.compare(
      req.body.password,
      userPresent.password
    );
    if (!verifyPass) {
      return res.status(400).send("Incorrect password");
    }

    const token = jwt.sign(
      { userId: userPresent._id, isAdmin: userPresent.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "2 days",
      }
    );

    return res.status(201).send({ msg: "User logged in successfully", token });
  } catch (err) {
    res.status(500).send("Unable to login user");
  }
};

export const updateProfile = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      { _id: req.locals },
      {
        $set: req.body,
      }
    );
    console.log(result);
    if (!result) {
      return res.status(500).send("Unable to update user");
    }
    return res.status(201).send("User updated successfully");
  } catch (err) {
    res.status(500).send("Unable to update user");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.locals } }).select(
      "-password"
    );
    return res.send(users);
  } catch (err) {
    res.status(500).send("Unable to get all users");
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    return res.send(user);
  } catch (error) {
    res.status(500).send("Unable to get user");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.body.userId);
    const removeDoc = await Doctor.findOneAndDelete({
      userId: req.body.userId,
    });

    await Appointment.deleteMany({ userId: req.body.userId })
      .then((res) => {
        console.log(
          `Deleted ${res.deletedCount} appointments with userId '${req.body.userId}'.`
        );
      })
      .catch((err) => {
        console.error(err);
      });

    await Review.deleteMany({ userId: req.body.userId })
      .then((res) => {
        console.log(
          `Deleted ${res.deletedCount} reviews with userId '${req.body.userId}'.`
        );
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    res.status(500).send("Unable to delete user");
  }
};
