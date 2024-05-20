import React from "react";
import insuranceImg from "../assests/insurance.jpeg";
import fitImg from "../assests/fit.jpeg"
import { Link } from 'react-router-dom';

const Predictors = () => {
  return (
    <div className="container my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 justify-center">
      <Link to="insurance">
        <div>
          <div className="max-w-xs rounded overflow-hidden shadow-lg">
            <img
              className="w-full h-32 object-cover"
              src={insuranceImg}
              alt="Medical Insurance"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-lg mb-2">Medical Insurance</div>
              <p className="text-gray-700 text-sm">
                 Calculate your medical insurance premium here!
              </p>
            </div>
          </div>
        </div>
        </Link>
        <Link to="fitness">
        <div>
          <div className="max-w-xs rounded overflow-hidden shadow-lg">
            <img
              className="w-full h-32 object-cover"
              src={fitImg}
              alt="Fitness"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-lg mb-2">Fitness Checker</div>
              <p className="text-gray-700 text-sm">
                 Do you think you are an active person? Check it now!
              </p>
            </div>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Predictors;
