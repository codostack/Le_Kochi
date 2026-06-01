import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
} from "lucide-react";

import adminAxios from "../../../axiosInstance/adminAxios";

export default function AdminLogin() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      // VALIDATION
      if (!email || !password) {

        return alert("Please fill all fields");

      }

      setLoading(true);

      const res = await adminAxios.post(
        "/adminAuth/login",
        {
          email,
          password,
        }
      );
localStorage.setItem(
  "adminId",
  res.data.adminId
);

window.location.href =
  "/admin/verify-otp";
    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50 px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-center">

          <div className="w-20 h-20 bg-white/20 rounded-3xl mx-auto flex items-center justify-center shadow-lg">
            <ShieldCheck className="text-white w-10 h-10" />
          </div>

          <h1 className="text-3xl font-bold text-white mt-5">
            Admin Login
          </h1>

          <p className="text-orange-100 mt-2 text-sm">
            Restaurant Management Dashboard
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="p-8 space-y-5"
        >

          {/* EMAIL */}
          <div>

            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Email Address
            </label>

            <div className="relative">

              <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />

              <input
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
              />

            </div>

          </div>

          {/* PASSWORD */}
          <div>

            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Password
            </label>

            <div className="relative">

              <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-12 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-3.5 text-gray-400 hover:text-orange-500"
              >

                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}

              </button>

            </div>

          </div>

          {/* FORGOT PASSWORD */}
          <div className="flex justify-end">

            <a
              href="/admin/forgot-password"
              className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-all"
            >
              Forgot Password?
            </a>

          </div>

          {/* LOGIN BUTTON */}
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
                Logging in...
              </>
            ) : (
              "Login"
            )}

          </button>

        </form>

      </div>

    </div>
  );
}