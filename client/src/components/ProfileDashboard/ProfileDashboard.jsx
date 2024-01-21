import React, { useState } from "react";
import useFetchUserInfo from "../../customHooks/useFetchUserInfo.jsx";
import { setLogout } from "../../redux/rootSlice.js";
import { useDispatch } from "react-redux";
import Bookings from "./Bookings.jsx";
import ProfileSettings from "./ProfileSettings.jsx";

const ProfileDashboard = () => {
  const { photo, email, name, role } = useFetchUserInfo();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogout());
  };

  const [tab, setTab] = useState("settings");
  
  return (
    <div className="max-w-[1170px] px-5 mx-auto">
      <div className="grid md:grid-cols-3 gap-10">
        <div className="pb-[50px] px-[30px] rounded-md">
          <div className="flex items-center justify-center">
            <figure className="mt-10 w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
              <img
                src={photo}
                alt="photo"
                className="w-full h-full rounded-full"
              />
            </figure>
          </div>
          <div className="text-center mt-4">
            <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
              {name}
            </h3>
            <p className="text-textColor text-[15px] leading-6 font-medium">
              {email}
            </p>
          </div>
          <div className="mt-[50px] md:mt-5">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="md:col-span-2 md:px-[30px] mt-4">
          <div className="flex justify-center">
            {role !== "admin" && (
              <button
                onClick={() => setTab("bookings")}
                className={` ${
                  tab === "bookings" && "bg-primaryColor text-white font-normal"
                } p-2 px-5 mr-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
              >
                My Bookings
              </button>
            )}  
            <button
              onClick={() => setTab("settings")}
              className={` ${
                tab === "settings" && "bg-primaryColor text-white font-normal"
              } py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
            >
              Profile Settings
            </button>
          </div>
          {role !== "admin" && tab === "bookings" && <Bookings role={role}/>}
          {tab === "settings" && <ProfileSettings />}
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
