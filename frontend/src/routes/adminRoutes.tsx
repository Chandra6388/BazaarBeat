
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/Admin/dashboard/Dashboard";
 
import NotFound from "@/pages/NotFound";
import { AuthProvider } from "@/contexts/AuthContext";

const UserRoute = () => {
  const navigate = useNavigate();

  return (
    <AuthProvider navigate={navigate}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </AuthProvider>
  );
};



export default UserRoute;
