import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      default: "others",
      required: true,
    },
    dob: {
      type: String,
      default: null,
    },
    photo: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function(next){
  if (this.password && this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 10);
  }
  next()
})

const User = mongoose.model("User", UserSchema);

export default User;
