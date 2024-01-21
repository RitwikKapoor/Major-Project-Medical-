import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Public = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn) {
    return <Navigate to="/home" replace={true} />;
  }

  return children;
};

export const Protected = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export const Admin = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (!isLoggedIn) {
          setRedirect("/login");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/user/getUserInfo`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200 && response.data.isAdmin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          setRedirect("/home");
        }
      } catch (error) {
        toast.error("Admin Auth Failed");
      }
    };

    fetchData();
  }, []);

  if (redirect) {
    return <Navigate to={redirect} replace={true} />;
  }

  return isAdmin ? children : null;
};

export const Doctor = ({ children }) => {
  const [isDoctor, setIsDoctor] = useState(false);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (!isLoggedIn) {
          setRedirect("/login");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/user/getUserInfo`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200 && response.data.isDoctor) {
          setIsDoctor(true);
        } else {
          setIsDoctor(false);
          setRedirect("/home");
        }
      } catch (error) {
        toast.error("Doctor Auth Failed");
      }
    };

    fetchData();
  }, []);

  if (redirect) {
    return <Navigate to={redirect} replace={true} />;
  }

  return isDoctor ? children : null;
};

export const User = ({ children }) => {
  const [isUser, setIsUser] = useState(false);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (!isLoggedIn) {
          setRedirect("/login");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/user/getUserInfo`,
          {
            withCredentials: true,
          }
        );

        if (
          response.status === 200 &&
          !response.data.isDoctor &&
          !response.data.isAdmin
        ) {
          setIsUser(true);
        } else {
          setIsUser(false);
          setRedirect("/home");
        }
      } catch (error) {
        toast.error("User Auth Failed");
      }
    };

    fetchData();
  }, []);

  if (redirect) {
    return <Navigate to={redirect} replace={true} />;
  }

  return isUser ? children : null;
};
