import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { setLoading } from "../../redux/rootSlice.js";

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
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
      const response = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/user/change-password`,
        passwordData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(setLoading(false));
        toast.success("Password changed successfully!");
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
    <section className="px-5 w-full max-w-[500px] mx-auto">
      <form className="py-4 md:py-0" onSubmit={submitHandler}>
        <div className="mb-5">
          <input
            type="password"
            placeholder="Enter your current password"
            name="currentPassword"
            value={passwordData.currentPassword}
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
            {loading ? (
              <HashLoader size={35} color="#ffffff" />
            ) : (
              "Change Password"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ChangePassword;
