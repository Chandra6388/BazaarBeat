import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import NotFound from "@/pages/NotFound";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useEffect } from "react";
import AdminRoutes from "@/routes/adminRoutes";
import UserRoutes from "@/routes/userRoutes";
import ForgotPass from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import { jwtDecode } from "jwt-decode";


const AppWithAuth = () => {
  const UserDetails = JSON.parse(localStorage.getItem("user") || "null");
  const Role = UserDetails?.Role;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;

    if (pathname === "/signup") {
      navigate("/signup");
      return;
    }

    if (pathname === "/forgot-password") {
      navigate("/forgot-password");
      return;
    }

    if (pathname === "/reset-password") {
      const tokenData = localStorage.getItem("token");
      if (!tokenData) {
        navigate("/login");
        return;
      }
      try {
        const decoded = jwtDecode(tokenData);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Invalid token format.", error);
        navigate("/login");
      }
      return;
    }

    if (!UserDetails || !Role || UserDetails === "null" || Role === "null" || pathname === "/login") {
      navigate("/login");
      return;
    }

    switch (Role) {
      case "ADMIN":
        if (
          pathname === "/login" ||
          pathname === "/" ||
          !pathname.startsWith("/admin")
        ) {
          navigate("/admin/dashboard");
        }
        break;

      case "USER":
        if (
          pathname === "/login" ||
          pathname === "/" ||
          !pathname.startsWith("/user")
        ) {
          navigate("/user/dashboard");
        }
        break;

      default:
        break;
    }
  }, [navigate, location, Role, UserDetails]);

  return (
    <AuthProvider navigate={navigate}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/admin/*"
          element={
            Role === "ADMIN" ? (
              <ProtectedRoute>
                <AdminRoutes />
              </ProtectedRoute>
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/user/*"
          element={
            Role === "USER" ? (
              <ProtectedRoute>
                <UserRoutes />
              </ProtectedRoute>
            ) : (
              <LoginPage />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </AuthProvider>
  );
};

function App() {
  return (
    <Router>
      <AppWithAuth />
    </Router>
  );
}

export default App;
