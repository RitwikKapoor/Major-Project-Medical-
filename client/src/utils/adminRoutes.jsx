import { lazy } from "react";

const Applications = lazy(() =>
  import("../components/Admin/AdminAllApplications.jsx")
);
const Doctors = lazy(() => import("../components/Admin/AdminAllDoctors.jsx"));
const Users = lazy(() => import("../components/Admin/AdminAllUsers.jsx"));
const Main = lazy(() => import("../components/Admin/AdminMainDashboard.jsx"));

const coreRoutes = [
  {
    path: "/dashboard/main",
    title: "Main",
    component: Main,
  },
  {
    path: "/dashboard/users",
    title: "All Users",
    component: Users,
  },
  {
    path: "/dashboard/doctors",
    title: "All Doctors",
    component: Doctors,
  },
  {
    path: "/dashboard/applications",
    title: "All Applications",
    component: Applications,
  },
];

const adminRoutes = [...coreRoutes];
export default adminRoutes;
