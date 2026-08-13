import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VerifyReset() {
  const [status, setStatus] = useState("verifying"); // verifying | error
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Missing verification token.");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/auth/verify-token?token=${token}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Verification failed");

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/dashboard", { replace: true });
      } catch (err) {
        setStatus("error");
        setMessage(err.message);
      }
    };

    verify();
  }, [searchParams, navigate]);

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center space-y-2">
          <p className="text-sm font-semibold text-red-600">{message}</p>
          <a href="/forgot-password" className="text-xs text-indigo-600 underline">
            Request a new link
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-sm text-gray-500">Verifying your email…</p>
    </div>
  );
}