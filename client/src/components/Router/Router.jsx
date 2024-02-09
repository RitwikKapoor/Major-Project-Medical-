import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const AdminDashboard = lazy(() => import("../../pages/AdminDashboard.jsx"));
const ApplyDoctor = lazy(() => import("../../pages/ApplyDoctor.jsx"));

import Home from "../../pages/Home.jsx";
import Login from "../../pages/Login.jsx";
import Register from "../../pages/Register.jsx";
import Doctors from "../../pages/Doctors.jsx";
import Loader from "../../comman/Loader/Loader.jsx";
import { Admin, Protected, Public, Doctor, User } from "../../utils/route.jsx";
import adminRoutes from "../../utils/adminRoutes.jsx";
import DoctorDetails from "../../pages/DoctorDetails.jsx";
import ProfileDashboard from "../ProfileDashboard/ProfileDashboard.jsx";
import PageNotFound from "../../pages/PageNotFound.jsx";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/login"
        element={
          <Public>
            <Login />
          </Public>
        }
      />
      <Route
        path="/register"
        element={
          <Public>
            <Register />
          </Public>
        }
      />
      <Route path="/doctors">
        <Route index element={<Doctors />} />
        <Route path=":id" element={<DoctorDetails />} />
      </Route>
      <Route
        path="/apply"
        element={
          <Suspense fallback={<Loader />}>
            <User>
              <ApplyDoctor />
            </User>
          </Suspense>
        }
      />
      <Route
        path="/profile/me"
        element={
          <Suspense fallback={<Loader />}>
            <Protected>
              <ProfileDashboard />
            </Protected>
          </Suspense>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<Loader />}>
            <Admin>
              <Navigate to="/dashboard/main" replace />
            </Admin>
          </Suspense>
        }
      />
      <Route element={<AdminDashboard />}>
        {adminRoutes.map((routes, index) => {
          const { path, component: Component } = routes;
          return (
            <Route
              key={index}
              path={path}
              element={
                <Suspense fallback={<Loader />}>
                  <Admin>
                    <Component />
                  </Admin>
                </Suspense>
              }
            />
          );
        })}
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
