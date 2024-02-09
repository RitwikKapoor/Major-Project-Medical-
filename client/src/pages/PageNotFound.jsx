import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div className="min-h-[500px] flex items-center justify-center">
      <div className="max-w-md p-8 bg-white shadow-md rounded-md flex flex-col items-center space-y-4">
        <FaExclamationCircle className="text-red-500 text-6xl" />
        <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
        <p className="text-lg text-gray-700">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="text-indigo-600 hover:underline">
          Go back to home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
