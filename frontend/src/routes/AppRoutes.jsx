import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {
  AnimatePresence,
} from "framer-motion";

import AuthPage from "../pages/auth/AuthPage";

import ForgotPassword from "../pages/auth/ForgotPassword";

import ResetPassword from "../pages/auth/ResetPassword";

import Dashboard from "../pages/dashboard/Dashboard";

import Profile from "../pages/profile/Profile";

import ProtectedRoute from "./ProtectedRoute";

import NotFound from "../pages/NotFound";


const AppRoutes = () => {

  const location =
    useLocation();

  return (

    <AnimatePresence mode="wait">

      <Routes
        location={location}
        key={location.pathname}
      >

        {/* AUTH */}
        <Route
          path="/login"
          element={<AuthPage />}
        />

        <Route
          path="/register"
          element={<AuthPage />}
        />

        <Route
          path="/forgot-password"
          element={
            <ForgotPassword />
          }
        />

        <Route
          path="/reset-password/:token"
          element={
            <ResetPassword />
          }
        />


        {/* PROTECTED */}
        <Route
          path="/"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>

              <Profile />

            </ProtectedRoute>
          }
        />


        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </AnimatePresence>

  );

};

export default AppRoutes;