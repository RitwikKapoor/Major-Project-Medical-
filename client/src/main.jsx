import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <App />
          <ToastContainer
            theme="dark"
            position="top-right"
            autoclose={3000}
            closeOnClick
            pauseOnHover={false}
          />
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
