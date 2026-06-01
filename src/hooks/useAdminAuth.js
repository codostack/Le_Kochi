import { useEffect, useState } from "react";
import adminAxios from "../axiosInstance/adminAxios";

export default function useAdminAuth() {

  const [loading, setLoading] =
    useState(true);

  const [isAuthenticated,
    setIsAuthenticated] =
    useState(false);

  useEffect(() => {

    const verifyToken = async () => {

      try {

        const res =
          await adminAxios.get(
            "/adminAuth/verify-token"
          );

        if (res.data.success) {

          setIsAuthenticated(true);

        }

      } catch (error) {

        localStorage.removeItem(
          "adminToken"
        );

        localStorage.removeItem(
          "adminData"
        );

        setIsAuthenticated(false);

      } finally {

        setLoading(false);

      }
    };

    verifyToken();

  }, []);

  return {
    loading,
    isAuthenticated,
  };
}