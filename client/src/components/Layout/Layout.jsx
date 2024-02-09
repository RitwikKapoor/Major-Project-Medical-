import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Router from "../Router/Router";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Router />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
