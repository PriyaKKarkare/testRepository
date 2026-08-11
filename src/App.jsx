import React, { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import Dashboard from "./pages/Dashboard";
import Finance from "./pages/Finance";
import SalesCRM from "./pages/SalesCRM";
import Compliance from "./pages/Compliance";
import Vendors from "./pages/Vendors";
import AISuits from "./pages/AISuits";
import Reports from "./pages/Reports";

import RMSDashboard from "./pages/rms/RMSDashboard";
import Loan from "./pages/rms/Loan";
import Disbursement from "./pages/rms/Disbursement";
import Invoices from "./pages/rms/Invoices";
import PO from "./pages/rms/PO";
import RMSReports from "./pages/rms/RMSReports";
import PortalLayout from "./Layout/PortalLayout";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem("token"));
  });

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <Routes>
      {/* Public Routes - Rendered directly if NOT authenticated */}
      <Route
        path="/"
        element={
          !isAuthenticated ? (
            <Login onLogin={handleLoginSuccess} />
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />
      <Route
        path="/signup"
        element={
          !isAuthenticated ? (
            <SignUp onSignUp={handleLoginSuccess} />
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />

      {/* Protected Routes - Render PortalLayout only if authenticated */}
      <Route
        element={
          isAuthenticated ? (
            <PortalLayout onLogout={handleLogout} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/sales-crm" element={<SalesCRM />} />

        <Route path="/rms" element={<RMSDashboard />} />
        <Route path="/rms/loan" element={<Loan />} />
        <Route path="/rms/disbursement" element={<Disbursement />} />
        <Route path="/rms/invoices" element={<Invoices />} />
        <Route path="/rms/po" element={<PO />} />
        <Route path="/rms/reports" element={<RMSReports />} />

        <Route path="/compliance" element={<Compliance />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/ai-suits" element={<AISuits />} />
        <Route path="/reports" element={<Reports />} />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}