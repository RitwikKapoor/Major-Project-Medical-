import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/rootSlice.js";
import { toast } from "react-toastify";
import axios from "axios";
import DoctorCard from "../components/Doctor/DoctorCard.jsx";
import BounceLoader from "react-spinners/BounceLoader";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const getAllDoctors = () => {
    dispatch(setLoading(true));
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/doctor/getAllDoctors`)
      .then((res) => {
        if (res.status === 200) {
          setDoctors(res.data);
          dispatch(setLoading(false));
        } else {
          throw new Error("Unexpected response");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <section className="bg-[#fff9ea] p-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Find a Doctor</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 justify-center">
          {doctors.map((doctor, i) => (
            <DoctorCard key={i} doctor={doctor} />
          ))}
        </div>
        {loading && (
          <div className="flex justify-center items-center mt-8">
            <BounceLoader color="#000000" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Doctors;
