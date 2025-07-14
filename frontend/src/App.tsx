import "./index.css";
import Dashboard from "./pages/dashboard";
import Homepage from "./pages/homepage";
import Login from "./onboarding/logIn/login";
import SignUp from "./onboarding/signUp/signup";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/" /> : <Homepage />}
      />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Navigate to="/" /> : <Dashboard />}
      />
    </Routes>
  );
}

export default App;
