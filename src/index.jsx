import React from "react"
import ReactDOM from "react-dom/client"
import "styles/index.css"
import App from "./App"

import { CoordinatorProvider } from "context/CoordinatorProvider"
import { StudentProvider } from "context/StudentProvider"
import { OrganizationProvider } from "context/OrganizationProvider"
import { UserProvider } from "context/UserProvider"
import { EnrollmentProvider } from "context/EnrollmentProvider"
import { RegisteredStudentProvider } from "context/RegisteredStudentProvider"
import { TaskProvider } from "context/TasksProvider"
import { AuthProvider } from "context/auth"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <AuthProvider>
      <TaskProvider>
        <RegisteredStudentProvider>
          <EnrollmentProvider>
            <UserProvider>
              <OrganizationProvider>
                <StudentProvider>
                  <CoordinatorProvider>
                    <App />
                  </CoordinatorProvider>
                </StudentProvider>
              </OrganizationProvider>
            </UserProvider>
          </EnrollmentProvider>
        </RegisteredStudentProvider>
      </TaskProvider>
    </AuthProvider>
  </React.StrictMode>
)
