  import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { MdLocationOn, MdCurrencyRupee } from "react-icons/md";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md max-w-xs max-h-full mb-4 lg:w-72 lg:max-w-xs lg:max-h-full lg:mr-4">
      <div className="relative h-48 overflow-hidden">
        <img
          src={doctor.userId.photo}
          alt={doctor.userId.firstname}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {doctor.userId.firstname} {doctor.userId.lastname}
        </h2>
        <p className="text-sm text-gray-600 mb-2">{doctor.specialization}</p>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />
            <p className="text-sm font-semibold text-gray-800">
              {doctor.averageRating}
            </p>
            <p className="text-xs text-gray-600">({doctor.totalRating})</p>
          </div>
          <div className="flex items-center gap-1">
            <MdCurrencyRupee className="text-gray-800" />
            <p className="text-sm font-semibold text-gray-800">{doctor.fees}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
          <MdLocationOn className="text-gray-800" />
          {doctor.clinicAddress}
        </p>
        <Link
          to={`/doctors/${doctor._id}`}
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          View Profile <BsArrowRight className="inline-block ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
