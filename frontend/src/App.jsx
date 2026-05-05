import { Navigate, RouterProvider } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import EmailVerificationPage from "./Pages/EmailVerificationPage";
import { Toaster } from "react-hot-toast";
import LandingPage from "./Pages/LandingPage";
import Dashboard from "./Pages/Dashboard";
import InventorySheet from "./Pages/InventorySheets";
// import SyncSage from "./Pages/SyncSage";
import Users from "./Pages/Users";
import Reports from "./Pages/Reports";
import SheetDetails from "./Pages/SheetDetails";
import DashboardLayout from "./layouts/DashboardLayout";
import { router } from "./routes";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
