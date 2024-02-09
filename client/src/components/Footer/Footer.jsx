import React from "react";
import logo from "../../assests/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
      <div className="bg-gray-800 text-gray-300 py-8 mt-auto">
        <div className="mx-auto px-4 flex flex-col md:flex-row items-center justify-center md:justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <Link to="/">
              <img src={logo} alt="Medicify" className="h-12" />
            </Link>
            <p className="mt-4">Book your doctor appointment with ease.</p>
          </div>
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="mt-2">
              <li>
                <Link to="/doctors" className="hover:text-gray-500">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-gray-500">
                  Register
                </Link>     
              </li>
              <li>
                <Link to="/login" className="hover:text-gray-500">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/home" className="hover:text-gray-500">
                  Home
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <p>Email: info@medicify.com</p>
            <p>Phone: +91 1234567890</p>
          </div>
        </div>
      </div>
  );
};

export default Footer;
