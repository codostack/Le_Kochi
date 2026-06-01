import { useState } from "react";

import adminAxios
from "../../../axiosInstance/adminAxios";

export default function VerifyOtp() {

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const adminId =
    localStorage.getItem(
      "adminId"
    );

  const handleVerify = async () => {

    try {

      if (!otp) {

        return alert(
          "Enter OTP"
        );

      }

      setLoading(true);

      const res =
        await adminAxios.post(

          "/adminAuth/verify-otp",

          {
            adminId,
            otp,
          }

        );

      // SAVE TOKEN
      localStorage.setItem(
        "adminToken",
        res.data.token
      );

      localStorage.setItem(
        "adminData",
        JSON.stringify(
          res.data.admin
        )
      );

      // REMOVE TEMP DATA
      localStorage.removeItem(
        "adminId"
      );

      alert(res.data.message);

      // REDIRECT
      window.location.href =
        "/admin/dashboard";

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-orange-50
      px-4
    ">

      <div className="
        bg-white
        rounded-3xl
        shadow-xl
        p-8
        w-full
        max-w-md
      ">

        <h1 className="
          text-3xl
          font-bold
          text-center
          mb-2
        ">
          Verify OTP
        </h1>

        <p className="
          text-center
          text-gray-500
          mb-6
        ">
          Enter the 4 digit OTP
          sent to your email
        </p>

        <input
          type="text"
          maxLength={4}
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value)
          }
          placeholder="0000"
          className="
            w-full
            border
            rounded-xl
            p-4
            text-center
            text-3xl
            tracking-[12px]
            outline-none
            focus:border-orange-500
          "
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="
            w-full
            bg-orange-500
            text-white
            py-3
            rounded-xl
            font-bold
            mt-5
          "
        >

          {
            loading
            ? "Verifying..."
            : "Verify OTP"
          }

        </button>

      </div>

    </div>

  );
}