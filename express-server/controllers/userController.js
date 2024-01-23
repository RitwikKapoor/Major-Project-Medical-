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
      return res.status(409).json({ msg: "Email already exists" });
    }
    const photo = req.body.photo || User.schema.path("photo").default();
    const user = await User({ ...req.body, photo });
    const result = await user.save();
    if (!result) {
      return res.status(500).json({ msg: "Unable to register user" });
    }
    return res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({ msg: "Unable to register user" });
  }
};

export const login = async (req, res) => {
  try {
    const userPresent = await User.findOne({ email: req.body.email });
    if (!userPresent) {
      return res.status(400).json({ msg: "No such user, register first" });
    }
    const verifyPass = await bcrypt.compare(
      req.body.password,
      userPresent.password
    );
    if (!verifyPass) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    const token = jwt.sign({ userId: userPresent._id }, process.env.JWT_SECRET);

    res.cookie("my_cookie", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return res.status(200).json({
      msg: "User logged in successfully",
    });
  } catch (err) {
    res.status(500).json({ msg: "Unable to login user" });
  }
};

export const logout = async (req, res) => {
  res.cookie("my_cookie", "", {
    expires: new Date(0),
  });
  res.send();
};

export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.locals).select(
      "photo firstname lastname isAdmin isDoctor email"
    );
    return res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ msg: "Unable to get user" });
  }
};

export const updateProfile = async (req, res) => {
  const { dob, password } = req.body;
  try {
    const updateFields = { ...req.body };

    if (dob) {
      const part = dob.split("-");
      const formattedDate = `${part[2]}-${part[1]}-${part[0]}`;
      updateFields.dob = formattedDate.toString();
    }

    if (password) {
      const hashpassword = await bcrypt.hash(password, 10);
      updateFields.password = hashpassword;
    }

    const result = await User.findByIdAndUpdate(
      { _id: req.locals },
      {
        ...updateFields,
      }
    );
    if (!result) {
      return res.status(500).send({ msg: "Unable to update user" });
    }
    return res.status(200).send({ msg: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Unable to update user" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.locals } }).select(
      "firstname lastname email gender photo"
    );
    return res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ msg: "Unable to get all users" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.id);
    await Doctor.findOneAndDelete({
      userId: req.body.id,
    });

    await Appointment.deleteMany({ userId: req.body.id })
      .then((res) => {
        console.log(
          `Deleted ${res.deletedCount} appointments with userId '${req.body.id}'.`
        );
      })
      .catch((err) => {
        console.error(err);
      });

    await Review.deleteMany({ userId: req.body.id })
      .then((res) => {
        console.log(
          `Deleted ${res.deletedCount} reviews with userId '${req.body.id}'.`
        );
      })
      .catch((err) => {
        console.error(err);
      });
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Unable to delete user" });
  }
};