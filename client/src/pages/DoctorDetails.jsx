import React, { useState, useEffect } from "react";
import DoctorAbout from "../components/Doctor/DoctorAbout";
import DoctorFeedback from "../components/Doctor/DoctorFeedback";
import SidePanel from "../components/Doctor/SidePanel";
import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/rootSlice.js";
import axios from "axios";
import BounceLoader from "react-spinners/BounceLoader";
import { toast } from "react-toastify";

const DoctorDetails = () => {
  const [tab, setTab] = useState("about");
  const [details, setDetails] = useState([]);
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { loading } = useSelector((state) => state.root);

  const dispatch = useDispatch();

  const getDoctorInfo = (e) => {
    dispatch(setLoading(true));
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/doctor/${id} `)
      .then((res) => {
        if (res.status === 200) {
          setDetails(res.data);
          dispatch(setLoading(false));
        } else {
          throw new Error("Unexpected response");
        }
      })
      .catch((error) => {
        toast.error(error.message);
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    getDoctorInfo();
  }, []);

  const handleUpdateReview = () => {
    getDoctorInfo();
  };

  return loading ? (
    <div className="flex justify-center items-center">
      <BounceLoader color="#000000" />
    </div>
  ) : (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex items-center gap-5">
              <figure className="max-w-[200px] max-h-[200px]">
                <img
                  src={details?.userId?.photo}
                  alt="doctorImage"
                  className="w-full"
                />
              </figure>
              <div>
                <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 1g:py-2 1g:px-6 text-[12px] leading-4 lg:text-[16px] 1g:leading-7 font-semibold rounded">
                  {details?.specialization}
                </span>
                <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                  {details?.userId?.firstname} {details?.userId?.lastname}
                </h3>
                <div className="flex items-center gap-[6px]">
                  <span className="flex items-center gap-[6px] leading-7 text-[16px] lg:leading-7 font-semibold text-headingColor">
                    <FaStar className="text-yellow-500 lg:text-xl" />{" "}
                    {details?.averageRating}
                  </span>
                  <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                    ({details?.totalRating})
                  </span>
                </div>
                <p className="text__para text-[12px] leading-6 md:text-[16px] lg:max-w-[390px]">
                  {details?.experience} years of experience
                </p>
              </div>
            </div>
            <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
              <button
                onClick={() => setTab("about")}
                className={`${
                  tab === "about" && "border-b border-solid border-primaryColor"
                } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                About
              </button>
              <button
                onClick={() => setTab("feedback")}
                className={`${
                  tab === "feedback" &&
                  "border-b border-solid border-primaryColor"
                } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                Feedback
              </button>
            </div>

            <div className="mt-[50px]">
              {tab === "about" && (
                <DoctorAbout
                  firstname={details?.userId?.firstname}
                  bio={details?.bio}
                  education={details?.education}
                  work={details?.work}
                />
              )}
              {tab === "feedback" && (
                <DoctorFeedback
                  reviews={details?.reviews}
                  totalRating={details?.totalRating}
                  onUpdateReview={handleUpdateReview}
                />
              )}
            </div>
          </div>
          <div>
            <SidePanel
              starttime={details?.starttime}
              endtime={details?.endtime}
              fees={details?.fees}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorDetails;
