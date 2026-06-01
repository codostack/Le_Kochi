import { useState } from "react";

import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  Loader2,
} from "lucide-react";

import { useParams } from "react-router-dom";

import adminAxios from "../../../axiosInstance/adminAxios";

export default function ResetPassword() {

  const { token } = useParams();

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleReset = async (e) => {

    e.preventDefault();

    try {

      // VALIDATION
      if (
        !password ||
        !confirmPassword
      ) {

        return alert(
          "Please fill all fields"
        );

      }

      if (
        password !== confirmPassword
      ) {

        return alert(
          "Passwords do not match"
        );

      }

      setLoading(true);

      const res =
        await adminAxios.post(
          `/adminAuth/reset-password/${token}`,
          {
            password,
          }
        );

      alert(res.data.message);

      window.location.href =
        "/admin/login";

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Reset failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-center">

          <div className="w-20 h-20 bg-white/20 rounded-3xl mx-auto flex items-center justify-center">
            <ShieldCheck className="text-white w-10 h-10" />
          </div>

          <h1 className="text-3xl font-bold text-white mt-4">
            Reset Password
          </h1>

          <p className="text-orange-100 mt-2">
            Create a strong new password
          </p>

        </div>

        {/* BODY */}
        <form
          onSubmit={handleReset}
          className="p-8 space-y-5"
        >

          {/* PASSWORD */}
          <div>

            <label className="text-sm font-semibold text-gray-700 block mb-2">
              New Password
            </label>

            <div className="relative">

              <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="New password"
                className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-12 outline-none focus:border-orange-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-3.5 text-gray-400"
              >

                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}

              </button>

            </div>

          </div>

          {/* CONFIRM PASSWORD */}
          <div>

            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Confirm Password
            </label>

            <div className="relative">

              <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm password"
                className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-orange-500"
              />

            </div>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full py-3 rounded-xl font-bold text-white
              bg-gradient-to-r from-orange-500 to-red-500
              transition-all shadow-lg
              flex items-center justify-center gap-2
              ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:scale-[1.02]"
              }
            `}
          >

            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}

          </button>

          {/* BACK */}
          <a
            href="/admin/login"
            className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 font-medium"
          >

            <ArrowLeft className="w-4 h-4" />

            Back to Login

          </a>

        </form>

      </div>

    </div>
  );
}