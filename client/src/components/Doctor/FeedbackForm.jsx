import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";

const FeedbackForm = ({onUpdateReview}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { role } = useSelector((state) => state.root.user);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.warn("Please login first");
      return;
    } else if (role !== "user") {
      toast.warn("You are not allowed to submit feedback from this account");
      return;
    }
    setLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_APP_BASE_URL}/doctor/${id}/reviews`,
        { rating, reviewText },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.msg);
          setLoading(false); 
          onUpdateReview()
          setRating(0);
          setReviewText("");
        } else {
          throw new Error("Unexpected response");
        }
      })
      .catch((error) => {
        setLoading(false); 
        toast.error(error.response.data.msg);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          How would you rate the overall experience?
        </h3>
        <div>
          {[...Array(5).keys()].map((index) => {
            const starValue = index + 1;
            return (
              <button
                key={starValue}
                type="button"
                className={`${
                  starValue <= (hover || rating)
                    ? "text-yellowColor"
                    : "text-gray-400"
                } bg-transparent border-none outline-none text-[22px] cursor-pointer `}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
                onDoubleClick={() => {
                  setHover(0);
                  setRating(0);
                }}
              >
                <AiFillStar />
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          Share your feedback!
        </h3>
        <textarea
          className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
          rows="5"
          placeholder="Write your review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        ></textarea>
      </div>
      <button className="btn w-80" type="submit">
        {loading ? <HashLoader size={20} color="#ffffff" /> : "Submit Feedback"}
      </button>
    </form> 
  );
};

export default FeedbackForm;
