import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../redux/rootSlice.js";

const ProfileMenu = ({ photo }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(setLogout());
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="relative inline-block text-sm">
        <button
          id="dropdownUserAvatarButton"
          data-dropdown-toggle="dropdownAvatar"
          className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
          type="button"
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-12 h-12 flex items-center justify-center bg-gray-300 rounded-full overflow-hidden"
            src={photo}
            alt="user photo"
          />
        </button>

        {/* Dropdown menu */}
        <div
          id="dropdownAvatar"
          className={`${
            isDropdownOpen ? "block" : "hidden"
          } z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44  absolute right-0 mt-2`}
        >
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <Link
                to="/profile/me"
                className="block px-4 py-2 hover:bg-gray-100 "
              >
                Profile
              </Link>
            </li>
          </ul>
          <div className="py-2">
            <div
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign out
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileMenu;
