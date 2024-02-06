import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/rootSlice.js";
import { toast } from "react-toastify";
import axios from "axios";
import BounceLoader from "react-spinners/BounceLoader";

const Bookings = ({ role }) => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  let endpoint;
  if (role === "doc") {
    endpoint = "getDoctorAppointments";
  } else {
    endpoint = "getUserAppointments";
  }

  const getAll = () => {
    dispatch(setLoading(true));
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/appoint/${endpoint}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setAppointments(res.data);
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
    getAll();
  }, []);

  return (
    loading ? (
      <div className="flex justify-center items-center">
      <BounceLoader color="#000000" />
    </div>
    ) :
    (
      <div className="rounded-sm bg-white p-4 shadow-default mt-5">
      <div className="max-w-full overflow-x-auto">
        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full table-auto">
            <thead className="bg-primaryColor text-white">
              <tr className="text-left">
                <th className="py-4 px-6 font-medium">S No.</th>
                <th className="py-3 px-6 font-medium">
                    {role === "doc" ? "Patient Name" : "Doctor Name"}
                </th>
                <th className="py-3 px-6 font-medium">Date</th>
                <th className="py-3 px-6 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments?.map((ele, i) => (
                <tr
                  key={i}
                  className={`${i % 2 === 0 ? "bg-gray-100 " : "bg-white"}`}
                >
                  <td className="py-4 px-6">
                    <h5 className="font-medium text-lighterBlack">{i + 1}</h5>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-lighterBlack">{ele?.name}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-lighterBlack">{ele?.date}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-lighterBlack">{ele?.time}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    )
  );
};

export default Bookings;

