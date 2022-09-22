import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";

import { CoordinatorProvider } from "context/CoordinatorProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CoordinatorProvider>
      <App />
    </CoordinatorProvider>
  </React.StrictMode>
);
