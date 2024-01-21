import React from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import ScrollButton from "./components/Layout/ScrollButton";
import useLocalStorageChangeListener from "./customHooks/useLocalStorageChangeListener";

function App() {
  useLocalStorageChangeListener("isLoggedIn");
  return(
    <>
      <Layout />;
      <ScrollButton/>
    </>
  ) 
}

export default App;
