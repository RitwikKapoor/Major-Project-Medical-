import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

ReviewSchema.pre(/^find/, function(next){
  this.populate({
    path: "userId",
    select: "firstname lastname photo"
  });

  next()
})


ReviewSchema.statics.calcAverageRatings = async function (doctorId) {
  const stats = await this.aggregate([
    {
      $match: { doctorId : doctorId },
    },
    {
      $group: {
        _id: "$doctor",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  
  await Doctor.findByIdAndUpdate(doctorId, {
    totalRating: stats[0].numOfRating,
    averageRating: stats[0].avgRating
  })
};

ReviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.doctorId);
});

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
