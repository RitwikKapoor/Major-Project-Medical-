import React, { useState } from "react";
import { setLoading } from "../../redux/rootSlice";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const BookModal = ({ onClose, starttime, endtime }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
  });
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookAppointment = (e) => {
    e.preventDefault();
    dispatch(setLoading(false));
    axios
      .post(
        `${import.meta.env.VITE_APP_BASE_URL}/appoint/book/${id}`,
        formData,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.msg);
          setTimeout(() => {
            dispatch(setLoading(false));
          }, 1000);
        } else {
          throw new Error("Unexpected response");
        }
      })
      .catch((error) => {
        setTimeout(() => {
          dispatch(setLoading(false));
          toast.error(error.response.data.msg);
        }, 1000);
      });
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl mb-4">Book Appointment</h2>

        <div className="mb-4">
          <form onSubmit={handleBookAppointment}>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                required
                min={new Date().toISOString().split("T")[0]}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                min={starttime}
                max={endtime}
                value={formData.time}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="flex justify-end">
              <button className="btn bg-green-500 text-white px-4 py-2 rounded-md mr-2">
                {loading ? <HashLoader size={35} color="#ffffff" /> : "Book"}
              </button>
              <button
                className="btn bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookModal;


