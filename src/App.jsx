import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// pages
import {
  Login,
  AdminDashboard,
  Coordinator,
  Students,
  EnrollmentModule,
  Organization,
  UpdateCoordinator,
  UpdateStudents,
  UpdateOrganization,
} from "./pages"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/admin" element={<AdminDashboard />} />
        <Route exact path="/coordinator" element={<Coordinator />} />
        <Route exact path="/students" element={<Students />} />
        <Route exact path="/enrollmentModule" element={<EnrollmentModule />} />
        <Route exact path="/organization" element={<Organization />} />
        <Route
          exact
          path="/updateCoordinator"
          element={<UpdateCoordinator />}
        />
        <Route exact path="/updateStudents" element={<UpdateStudents />} />
        <Route
          exact
          path="/updateOrganization"
          element={<UpdateOrganization />}
        />
      </Routes>
    </Router>
  )
}

export default App
