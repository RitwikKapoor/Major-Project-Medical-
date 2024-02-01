import User from "../models/UserModel.js";

const userCheck = async (req, res, next) => {
  const user = await User.findOne({ _id: req.locals });
  if (!user.isDoctor || !user.isAdmin) {
    next();
  } else {
    return res.status(401).json({ msg: "You are not authorized user only" });
  }
};

export default userCheck;
