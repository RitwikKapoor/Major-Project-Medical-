import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/rootSlice.js";

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
  });

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.root);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formDataWithoutEmptyStrings = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value !== "")
    );

    if (Object.keys(formDataWithoutEmptyStrings).length === 0) {
      toast.info("No data in any field");
      return;
    }

    dispatch(setLoading(true));
    axios
      .put(
        `${import.meta.env.VITE_APP_BASE_URL}/user/update`,
        formDataWithoutEmptyStrings,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.msg);
          dispatch(setLoading(false));
        } else {
          throw new Error("Unexpected response");
        }
      })
      .catch((error) => {
        dispatch(setLoading(false));
        toast.error(error.response.data.msg);
      });
  };

  return (
    <form onSubmit={submitHandler} className="px-5 w-full max-w-[500px] mx-auto mt-4">
      <div className="mb-5">
        <input
          type="text"
          placeholder="Enter your firstname"
          name="firstname"
          id="firstname"
          value={formData.firstname}
          onChange={handleInputChange}
          className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
        />
      </div>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Enter your lastname"
          name="lastname"
          id="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
          className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
        />
      </div>
      <div className="mb-5">
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
        />
      </div>
      <div className="mb-5">
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          max={new Date().toISOString().split("T")[0]}
          onChange={handleInputChange}
          className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
        />
      </div>
      <div className="mb-5 flex items-center justify-between">
        <label
          htmlFor="gender"
          className="text-headingColor font-bold text-[16px] leading-7"
        >
          Gender:
          <select
            value={formData.gender}
            onChange={handleInputChange}
            name="gender"
            id="gender"
            className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </label>
      </div>

      <div className="mt-7 mb-8">
        <button
          disabled={loading && true}
          type="submit"
          className="w-full bg-primaryColor text-[18px] leading-[30px] rounded-lg px-4 py-3"
        >
          {loading ? <HashLoader size={35} color="#ffffff" /> : "Update"}
        </button>
      </div>
    </form>
  );
};

export default ProfileSettings;
