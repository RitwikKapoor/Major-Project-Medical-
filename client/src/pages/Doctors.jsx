import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/rootSlice.js";
import { toast } from "react-toastify";
import axios from "axios";
import DoctorCard from "../components/Doctor/DoctorCard.jsx";


const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getAllDoctors = (e) => {
    dispatch(setLoading(true));
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/doctor/getAllDoctors `)
      .then((res) => {
        if (res.status === 200) {
          setDoctors(res.data);
          dispatch(setLoading(false));
        } else {
          throw new Error("Unexpected response");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="text-center">
          <h2 className="heading">Find a Doctor</h2>
          {/* <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder: text-textColor"
              placeholder="Search Doctor"
            />
            <button className="btn mt-0 rounded-[0px] rounded-r-md">
              Search
            </button>
          </div> */}
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:ml-16 md:ml-6 md:gap-14 lg:gap-44">
            {doctors.map((doctor, i) => (
              <DoctorCard key={i} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Doctors;
