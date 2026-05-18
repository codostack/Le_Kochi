import { useEffect, useState } from "react";
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

  const checkAuth = async () => {
    try {
      setLoading(true);

      const token = getToken();

      if (!token) {
        setAuthed(false);
        return;
      }

      // Decode token
      const decoded = jwtDecode(token);

      console.log("DECODED:", decoded);

      // Store customer ID globally
      setCustomerId(decoded.id);

      // Check expiry
      const localValid = isTokenValid(token);

      if (!localValid) {
        removeToken();
        setAuthed(false);
        setCustomerId(null);
        return;
      }

      // Verify from backend
      const res = await axiosInstance.get(
        "/auth/verify-token"
      );

      if (res.data?.success) {
        setAuthed(true);

        // Optional customer data
        setCustomer(res.data.user);
      } else {
        setAuthed(false);
      }

    } catch (err) {
      console.log("AUTH ERROR:", err);

      removeToken();

      setAuthed(false);

      setCustomerId(null);

    } finally {
      setLoading(false);
    }
  };

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
  }, []);

  return {
    authed,
    loading,
    recheck: checkAuth,
  };
}