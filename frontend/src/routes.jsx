import { createBrowserRouter, Navigate } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./Pages/Dashboard";
import InventorySheet from "./Pages/InventorySheets";
import SheetDetails from "./Pages/SheetDetails";
import SyncSage from "./Pages/SyncSage";
import Users from "./Pages/Users";
import Reports from "./Pages/Reports";
import LoginPage from "./Pages/LoginPage";
import MobileLayout from "./layouts/MobileLayout";
import MobileCount from "./Pages/mobile/MobileCount";
import MobileHome from "./Pages/mobile/MobileHome";
import MobileProfile from "./Pages/mobile/MobileProfile";
import MobileScanner from "./Pages/mobile/MobileScanner";
import { NotFound } from "./Pages/NotFound";
import SignUpPage from "./Pages/SignUpPage";
import EmailVerificationPage from "./Pages/EmailVerificationPage";
import { useAuthStore } from "./store/authStore";
import CreateSheetUI from "./Pages/CreateSheetUI";
/*import ForgotPassword from "./Pages/ForgotPassword";*/
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
    if (!user.isVerified) {
      return <Navigate to="/verify-email" />;
    }
    return children;
  }
};
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated) {
    console.log("isAuthenticated", isAuthenticated);
    return <Navigate to="/app" replace />;
  }
  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",

    element: (
      <RedirectAuthenticatedUser>
        <LandingPage />
      </RedirectAuthenticatedUser>
    ),
  },
  {
    path: "/login",
    element: (
      <RedirectAuthenticatedUser>
        <LoginPage />
      </RedirectAuthenticatedUser>
    ),
  },
  {
    path: "/signup",
    element: (
      <RedirectAuthenticatedUser>
        <SignUpPage />
      </RedirectAuthenticatedUser>
    ),
  },
  {
    path: "/verify-email",
    element: (
      <RedirectAuthenticatedUser>
        <EmailVerificationPage />
      </RedirectAuthenticatedUser>
    ),
  },
  {
    path: "/app",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "sheets", element: <InventorySheet /> },
      { path: "sheets/:id", element: <SheetDetails /> },
      { path: "sync", element: <SyncSage /> },
      { path: "users", element: <Users /> },
      { path: "reports", element: <Reports /> },
    ],
  },
  {
    path: "/mobile",
    Component: MobileLayout,
    children: [
      { index: true, Component: MobileHome },
      { path: "count/:id", Component: MobileCount },
      { path: "scanner", Component: MobileScanner },
      { path: "profile", Component: MobileProfile },
    ],
  },
  {
    path: "/create-sheet",
    Component: CreateSheetUI,
  },

  {
    path: "*",
    Component: NotFound,
  },
]);
