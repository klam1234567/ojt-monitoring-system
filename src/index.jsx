import React from "react"
import ReactDOM from "react-dom/client"
import "styles/index.css"
import App from "./App"

import { CoordinatorProvider } from "context/CoordinatorProvider"
import { StudentProvider } from "context/StudentProvider"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <StudentProvider>
      <CoordinatorProvider>
        <App />
      </CoordinatorProvider>
    </StudentProvider>
  </React.StrictMode>
)
