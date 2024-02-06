import React, { useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import ScrollButton from "./components/Layout/ScrollButton";
import useLocalStorageChangeListener from "./customHooks/useLocalStorageChangeListener";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/rootSlice";
import useFetchUserInfo from "./customHooks/useFetchUserInfo";

function App() {
  useLocalStorageChangeListener("isLoggedIn");
  const { role, photo, name, email } = useFetchUserInfo();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setUser({
        role,
        name,
        email,
        photo,
      })
    );
  }, [role, name, email, photo]);
  return (
    <>
      <Layout />
      <ScrollButton />
    </>
  );
}

export default App;
