import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLogout } from "../redux/rootSlice.js";

const useLocalStorageChangeListener = (key) => {
  const dispatch = useDispatch();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        const newValue = event.newValue;
        const oldValue = event.oldValue;

        if (newValue === null || newValue === undefined) {
          // Key-value pair deleted from local storage
          dispatch(setLogout());
        } else if (newValue !== oldValue) {
          // Value changed in the local storage
          dispatch(setLogout());
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch, key]);
  useEffect(() => {
    // Handle the initial value when the component mounts
    if (isLoggedIn !== null) {
      const loggedInValue = isLoggedIn ? "true" : "false";
      localStorage.setItem(key, loggedInValue);
    }
  }, [isLoggedIn, key]);

  return isLoggedIn;
};

export default useLocalStorageChangeListener;
