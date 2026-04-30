import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
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
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import ProfileInfoPage from "./Pages/ProfileInfoPage";
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated) {
    console.log("isAuthenticated", isAuthenticated);
    return <Navigate to="/app" replace />;
  }
  switch (user?.role) {
    case "Admin":
      return <Navigate to="/app" replace />;
    case "Gestionnaire":
      return <Navigate to="/app" replace />;
    case "Compteur":
      return <Navigate to="/mobile" replace />;
    default:
      break;
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
    path: "/forgot-password",
    element: (
      <RedirectAuthenticatedUser>
        <ForgotPasswordPage />
      </RedirectAuthenticatedUser>
    ),
  },
  {
    path: "/reset-password/:token",
    element: (
      <RedirectAuthenticatedUser>
        <ResetPasswordPage />
      </RedirectAuthenticatedUser>
    ),
  },

  {
    path: "/app",

    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            {" "}
            <Dashboard />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "sheets",
        element: (
          <ProtectedRoute>
            {" "}
            <InventorySheet />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "sheets/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <SheetDetails />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "sync",
        element: (
          <ProtectedRoute>
            {" "}
            <SyncSage />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedRoute>
            {" "}
            <Users />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "reports",
        element: (
          <ProtectedRoute>
            {" "}
            <Reports />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfileInfoPage />
          </ProtectedRoute>
        ),
      },
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
