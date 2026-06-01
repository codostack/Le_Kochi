import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../axiosInstance/page";

import {
  getToken,
  isTokenValid,
  removeToken,
} from "../utils/auth";

import { jwtDecode } from "jwt-decode";

import { useAuthContext } from "../context/AuthContext";

export default function useAuth() {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    setCustomerId,
    setCustomer,
  } = useAuthContext();

  // ✅ Wrap with useCallback
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);

      const token = getToken();

      // No token
      if (!token) {
        setAuthed(false);
        setCustomerId(null);
        return;
      }

      // Decode token
      const decoded = jwtDecode(token);

      console.log("DECODED:", decoded);

      // Save customer id globally
      setCustomerId(decoded.id);

      // Check token expiry locally
      const localValid = isTokenValid(token);

      if (!localValid) {
        removeToken();
        setAuthed(false);
        setCustomerId(null);
        return;
      }

      // Verify token from backend
      const res = await axiosInstance.get(
        "/auth/verify-token"
      );

      if (res.data?.success) {
        setAuthed(true);

        // Optional user data
        setCustomer(res.data.user);
      } else {
        removeToken();
        setAuthed(false);
        setCustomerId(null);
      }

    } catch (err) {
      console.log("AUTH ERROR:", err);

      removeToken();

      setAuthed(false);

      setCustomerId(null);

    } finally {
      setLoading(false);
    }
  }, [setCustomerId, setCustomer]);

  // ✅ Proper dependency
  useEffect(() => {
    checkAuth();

    const onStorage = (e) => {
      if (e.key === "token") {
        checkAuth();
      }
    };

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, [checkAuth]);

  return {
    authed,
    loading,
    recheck: checkAuth,
  };
}