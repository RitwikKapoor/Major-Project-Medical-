import Review from "../models/ReviewModel.js";
import Doctor from "../models/DoctorModel.js";

export const createReview = async (req, res) => {
  try {
    const new_review = new Review({
      doctorId: req.params.id,
      userId: req.locals,
      reviewText: req.body.reviewText,
      rating: req.body.rating,
    });

    const result = await new_review.save();

    await Doctor.findByIdAndUpdate(req.params.id, {
      $push: { reviews: result._id },
    });

    return res.status(201).send({msg:"Review Submitted"});
  } catch (err) {
    res.status(500).send({msg: "Unable to create review"});
  }
};
