import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Store } from "./app/Store.js";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
      <Toaster/>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
