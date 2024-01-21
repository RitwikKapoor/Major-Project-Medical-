import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";  

export const rootReducer = createSlice({
  name: "root",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLogin: () => {
      localStorage.setItem("isLoggedIn", "true");
    },
    setLogout: () => {
      localStorage.removeItem("isLoggedIn");
      axios
        .post(
          `${import.meta.env.VITE_APP_BASE_URL}/user/logout`,
          {},
          {
            withCredentials: true,
          }
        )
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});

export const { setLoading, setLogin, setLogout } = rootReducer.actions;
export default rootReducer.reducer;
