import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "@/components/ui/toaster";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import DashboardPage from "./pages/DashboardPage";
import ProjectPage from "./pages/ProjectPage";

const user = JSON.parse(localStorage.getItem('user'));
const ProtectRoute = ({ children }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};


const AuthenticatedUserRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated && user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/register"
          element={
            <AuthenticatedUserRoute>
              <Register />
            </AuthenticatedUserRoute>
          }
        />
        <Route path="/login"
          element={
            <AuthenticatedUserRoute>
              <LoginPage />
            </AuthenticatedUserRoute>
          }
        />
        <Route path="/dashboard"
          element={
            <ProtectRoute>
              <DashboardPage />
            </ProtectRoute>
          }
        />
        <Route path="/project"
          element={
            <ProtectRoute>
              <ProjectPage />
            </ProtectRoute>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;