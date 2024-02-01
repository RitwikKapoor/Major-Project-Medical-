import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const rootReducer = createSlice({
  name: "root",
  initialState: {
    loading: false,
    user: {},
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
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLoading, setLogin, setLogout, setUser } = rootReducer.actions;
export default rootReducer.reducer;
