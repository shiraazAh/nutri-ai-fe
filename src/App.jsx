import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Dashboard from "./components/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import { useEffect } from "react";
import cognitoAuthConfig from "./configs/aws-exports";
import { Amplify } from "aws-amplify";
import { AuthProvider, useAuth } from "./components/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Spin } from "antd";

Amplify.configure(cognitoAuthConfig);

const AppRoutes = () => {
  const { signedIn } = useAuth();
  return signedIn === null ? (
    <div className="h-screen flex items-center justify-center">
      <Spin size="large"/>
    </div>
  ) : (
    <Routes>
      <Route
        path="/signup"
        element={signedIn ? <Navigate to="/" /> : <SignUp />}
      />
      <Route
        path="/signin"
        element={signedIn ? <Navigate to="/" /> : <SignIn />}
      />
      <Route
        path="/"
        element={
          signedIn ? (
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
    </Routes>
  );
};
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
