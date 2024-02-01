import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import { MdCurrencyRupee } from "react-icons/md";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="p-3 1g:p-4">
      <div>
        <img src={doctor.userId.photo} />
      </div>
      <h2 className="text-[18px] leading-[30px] 1g:text-[26px] 1g:leading-9 text-headingColor font-[700] mt-3 lg:mt-5">
        {doctor.userId.firstname} {doctor.userId.lastname}
      </h2>
      <div className="mt-1 flex items-center justify-between">
        <span className="bg-green-200 text-irisBlueColor px-2 py-2 text-14px] leading-4 font-semibold rounded">
          {doctor.specialization}
        </span>
        <div className="flex items-center gap-[6px]">
          <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] 1g:leading-7 font-semibold text-headingColor">
            <FaStar className="text-yellow-500 lg:text-xl" />
            {doctor.averageRating}
          </span>
          <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
            ({doctor.totalRating})
          </span>
        </div>
      </div>

      <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
        <div>
          <div className="flex justify-start items-center">
            <MdCurrencyRupee />
            <h3 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor">
              {doctor.fees}
            </h3>
          </div>
          <p className="text-[14px] leading-6 font-[400] text-textColor">
            At {doctor.clinicAddress}
          </p>
        </div>
        <Link
          to={`/doctors/${doctor._id}`}
          className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none"
        >
          <BsArrowRight className="■group-hover:text-white w-6 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
