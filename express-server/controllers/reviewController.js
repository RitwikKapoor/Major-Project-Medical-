import Review from "../models/ReviewModel.js";
import Doctor from "../models/DoctorModel.js";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.status(200).send(reviews);
  } catch (err) {
    res.status(404).send("Reviews not found");
  }
};

export const createReview = async (req, res) => {
  try {
    const new_review = await Review({
      doctorId: req.params.id,
      userId: req.locals,
      reviewText: req.body.text,
      rating: req.body.rating,
    });

    const result = await new_review.save();

    await Doctor.findByIdAndUpdate(req.params.id, {
      $push: { reviews: result._id },
    });

    return res.status(201).send("Review Submitted");
  } catch (err) {
    res.status(500).send("Unable to create review");
  }
};
