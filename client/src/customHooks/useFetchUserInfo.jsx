import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogout } from "../redux/rootSlice.js";

const useFetchUserInfo = () => {
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState(null);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/user/getUserInfo`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setPhoto(response.data.photo);
          setEmail(response.data.email);
          setName(response.data.firstname + " " + response.data.lastname);

          if (response.data.isAdmin) {
            setRole("admin");
          } else if (response.data.isDoctor) {
            setRole("doc");
          }else{
            setRole("user")
          }
        } else {
          throw new Error("Unexpected response");
        }
      } catch (error) {
        dispatch(setLogout());
        window.location.reload();
        console.error(error);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, []);

  return { photo, role, email, name };
};

export default useFetchUserInfo;
