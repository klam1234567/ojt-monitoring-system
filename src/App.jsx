import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import {
  Login,
  AdminDashboard,
  Coordinator,
  Students,
  EnrollmentModule,
  Organization,
} from "pages";

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
      </Routes>
    </Router>
  );
}

export default App;
