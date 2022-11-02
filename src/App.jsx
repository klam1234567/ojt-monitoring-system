import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { PrivateRoute } from "components"
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

        {/* Administrator Routes */}
        <Route exact path="/admin" element={<PrivateRoute />}>
          <Route exact path="/admin" element={<AdminDashboard />} />
        </Route>
        <Route exact path="/coordinator" element={<PrivateRoute />}>
          <Route exact path="/coordinator" element={<Coordinator />} />
        </Route>
        <Route exact path="/students" element={<PrivateRoute />}>
          <Route exact path="/students" element={<Students />} />
        </Route>
        <Route exact path="/enrollmentModule" element={<PrivateRoute />}>
          <Route
            exact
            path="/enrollmentModule"
            element={<EnrollmentModule />}
          />
        </Route>
        <Route exact path="/organization" element={<PrivateRoute />}>
          <Route exact path="/organization" element={<Organization />} />
        </Route>
        <Route exact path="/updateCoordinator" element={<PrivateRoute />}>
          <Route
            exact
            path="/updateCoordinator"
            element={<UpdateCoordinator />}
          />
        </Route>
        <Route exact path="/updateStudents" element={<PrivateRoute />}>
          <Route exact path="/updateStudents" element={<UpdateStudents />} />
        </Route>
        <Route exact path="/updateOrganization" element={<PrivateRoute />}>
          <Route
            exact
            path="/updateOrganization"
            element={<UpdateOrganization />}
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
