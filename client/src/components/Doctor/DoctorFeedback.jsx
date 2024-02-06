import React, { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";

const DoctorFeedback = ({ reviews, totalRating, onUpdateReview }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <div>
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          All Reviews ({totalRating})
        </h4>

        <div className="overflow-auto max-h-80">
          {reviews?.map((review, i) => (
            <div
              key={i}
              className="flex justify-between items-start gap-4 mb-6"
            >
              <div className="flex items-center gap-2">
                <img
                  className="w-10 h-10 rounded-full"
                  src={review?.userId?.photo}
                  alt=""
                />
                <div>
                  <h5 className="text-base font-semibold text-gray-800">
                    {review?.userId?.firstname} {review?.userId?.lastname}
                  </h5>
                  <p className="text-sm text-gray-500">
                    {formatDate(review?.createdAt)}
                  </p>
                  <p className="text-sm text-gray-700">{review?.reviewText}</p>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(review?.rating).keys()].map((_, index) => (
                  <AiFillStar key={index} color="#0067FF" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {!showFeedbackForm && (
        <div className="text-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => setShowFeedbackForm(true)}
          >
            Give Feedback
          </button>
        </div>
      )}
      {showFeedbackForm && <FeedbackForm onUpdateReview={onUpdateReview} />}
    </div>
  );
};

export default DoctorFeedback;
