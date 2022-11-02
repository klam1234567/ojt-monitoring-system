import React from "react"
import ReactDOM from "react-dom/client"
import "styles/index.css"
import App from "./App"

import { CoordinatorProvider } from "context/CoordinatorProvider"
import { StudentProvider } from "context/StudentProvider"
import { OrganizationProvider } from "context/OrganizationProvider"
import { UserProvider } from "context/UserProvider"
import { AuthProvider } from "context/auth"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <OrganizationProvider>
          <StudentProvider>
            <CoordinatorProvider>
              <App />
            </CoordinatorProvider>
          </StudentProvider>
        </OrganizationProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
)
