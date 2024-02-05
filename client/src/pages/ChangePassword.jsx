import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { setLoading } from "../redux/rootSlice.js";

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const handleInputChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/user/change-password`,
        passwordData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setTimeout(() => {
          dispatch(setLoading(false));
          toast.success("Password changed successfully!");
        }, 1000);
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error) {
      setTimeout(() => {
        dispatch(setLoading(false));
        toast.error(error.response?.data?.msg || "Failed to change password");
      }, 1000);
    }
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Change Password
        </h3>
        <form className="py-4 md:py-0" onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="password"
              placeholder="Enter your old password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="Enter your new password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              required
            />
          </div>
          <div className="mt-7">
            <button
              disabled={loading && true}
              type="submit"
              className="w-full bg-primaryColor text-[18px] leading-[30px] rounded-lg px-4 py-3"
            >
              {loading ? <HashLoader size={35} color="#ffffff" /> : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
