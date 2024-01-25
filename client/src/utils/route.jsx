import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

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
  const { role } = useSelector((state) => state.root.user);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  useEffect(() => {
    if (role) {
      setLoading(false);
    }
  }, [role]);

  if (loading) {
    return null;
  }

  if (role === "admin") {
    return children;
  }

  return <Navigate to="/login" replace={true} />;
};

export const Doctor = ({ children }) => {
  const { role } = useSelector((state) => state.root.user);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  useEffect(() => {
    if (role) {
      setLoading(false);
    }
  }, [role]);

  if (loading) {
    return null;
  }

  if (role === "doc") {
    return children;
  }

  return <Navigate to="/login" replace={true} />;
};

export const User = ({ children }) => {
  const { role } = useSelector((state) => state.root.user);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/login" replac e={true} />;
  }

  useEffect(() => {
    if (role) {
      setLoading(false);
    }
  }, [role]);

  if (loading) {
    return null;
  }

  if (role === "user") {
    return children;
  }

  return <Navigate to="/login" replace={true} />;
};
