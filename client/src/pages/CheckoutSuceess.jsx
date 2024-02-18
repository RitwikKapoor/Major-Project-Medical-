import React from "react";
import { BiCheckCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <BiCheckCircle className="text-green-500 mb-4 w-24 h-24" />
      <h2 className="text-2xl font-bold mb-2 text-center">
        Appointment Booked Successfully
      </h2>
      <p className="text-gray-600 mb-4 text-center">
        Your payment was successful.
      </p>
      <Link
        to="/home"
        className="btn bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default CheckoutSuccess;
