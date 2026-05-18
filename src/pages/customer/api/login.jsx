// Login.jsx
// Matches the dark/gold design system from foodHelpers.jsx
// Preserves cart state in localStorage across auth redirects

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../../axiosInstance/page";
import { restorePendingCart } from "../../public/mean/Foodhelpers";

/* ── tiny helpers ─────────────────────────────────────────── */
const EyeIcon = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

const SpinnerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

/* ── validation ───────────────────────────────────────────── */
const validate = ({ email, password }) => {
  const errs = {};
  if (!email.trim()) errs.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errs.email = "Enter a valid email address";
  if (!password) errs.password = "Password is required";
  else if (password.length < 6) errs.password = "Password must be at least 6 characters";
  return errs;
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const restoredCart = restorePendingCart();

  // ── Where to redirect after login ──
  // Priority: location.state.from → /menu (so user lands back with cart visible)
  const from = location.state?.from || "/menu";

  const [fields, setFields] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  const set = (key) => (e) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);

    if (Object.keys(errs).length) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/login", {
        email: fields.email,
        password: fields.password,
      });

      // ── Save token ──
      const token = res.data.token || res.data.access_token;
      if (token) localStorage.setItem("token", token);

      restorePendingCart();

      setSuccess(true);

      // ── After success flash, go to origin (cart/menu) ──
      setTimeout(() => {
        navigate(from, { replace: true, state: { restoreCart: true } });
      }, 1200);

    } catch (error) {
      const msg = error.response?.data?.message || "Invalid email or password";
      setErrors({ form: msg });
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  /* ── field style helpers ──────────────────────────────────── */
  const baseInput = (key) => ({
    value: fields[key],
    onChange: set(key),
    onFocus: () => setFocused(key),
    onBlur: () => setFocused(""),
    style: {
      width: "100%",
      height: "46px",
      background: "#111",
      border: `1px solid ${errors[key] ? "#7f1d1d" : focused === key ? "#d4af37" : "#2a2a2a"}`,
      borderRadius: "10px",
      padding: "0 14px",
      fontSize: "14px",
      color: "#fff",
      outline: "none",
      boxSizing: "border-box",
      transition: "border-color 0.2s",
      fontFamily: "inherit",
    },
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    }}>
      <style>{`
        @keyframes spin   { to { transform: rotate(360deg); } }
        @keyframes shake  {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-6px)}
          40%{transform:translateX(6px)}
          60%{transform:translateX(-4px)}
          80%{transform:translateX(4px)}
        }
        @keyframes fadeUp {
          from{opacity:0;transform:translateY(16px)}
          to{opacity:1;transform:translateY(0)}
        }
        .login-card        { animation: fadeUp 0.35s ease both; }
        .login-card.shake  { animation: shake 0.45s ease; }
        .submit-btn:hover:not(:disabled) { background: #f0c842 !important; }
        .submit-btn:active:not(:disabled){ transform: scale(0.98); }
        .link-btn { background:none;border:none;cursor:pointer;padding:0;font-family:inherit; }
      `}</style>

      <div className={`login-card${shake ? " shake" : ""}`} style={{
        background: "#111",
        border: "1px solid #1e1e1e",
        borderRadius: "20px",
        padding: "2.5rem",
        width: "100%",
        maxWidth: "400px",
      }}>

        {/* Logo mark */}
        <div style={{
          width: "44px", height: "44px",
          background: "#1a1a0a",
          border: "1px solid #2e2a10",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.75rem",
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#d4af37" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M2 17l10 5 10-5" stroke="#d4af37" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M2 12l10 5 10-5" stroke="#d4af37" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>

        <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#fff", margin: "0 0 6px" }}>
          Welcome back
        </h1>
        <p style={{ fontSize: "13px", color: "#555", margin: "0 0 2rem", lineHeight: "1.5" }}>
          Sign in to access your cart and orders.{" "}
          <button
            className="link-btn"
            onClick={() => navigate("/registration", { state: { from } })}
            style={{ color: "#d4af37", fontSize: "13px", textDecoration: "underline" }}
          >
            Create account
          </button>
        </p>

        {/* Form error banner */}
        {errors.form && (
          <div style={{
            background: "#1a0808",
            border: "1px solid #7f1d1d",
            borderRadius: "10px",
            padding: "10px 14px",
            marginBottom: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span style={{ fontSize: "12px", color: "#f87171" }}>{errors.form}</span>
          </div>
        )}

        {/* Email */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{
            display: "block", fontSize: "12px", fontWeight: "600",
            color: "#777", letterSpacing: "0.05em",
            textTransform: "uppercase", marginBottom: "8px",
          }}>
            Email address
          </label>
          <input type="email" placeholder="you@example.com" {...baseInput("email")} />
          {errors.email && (
            <p style={{ fontSize: "11px", color: "#f87171", marginTop: "5px" }}>{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div style={{ marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <label style={{
              fontSize: "12px", fontWeight: "600",
              color: "#777", letterSpacing: "0.05em", textTransform: "uppercase",
            }}>
              Password
            </label>
            <button className="link-btn"
              style={{ fontSize: "11px", color: "#555", textDecoration: "underline" }}>
              Forgot password?
            </button>
          </div>
          <div style={{ position: "relative" }}>
            <input
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              {...baseInput("password")}
              style={{ ...baseInput("password").style, paddingRight: "44px" }}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="link-btn"
              style={{
                position: "absolute", right: "13px", top: "50%",
                transform: "translateY(-50%)",
                color: "#555", display: "flex", alignItems: "center",
              }}
              aria-label="Toggle password visibility"
            >
              <EyeIcon open={showPw} />
            </button>
          </div>
          {errors.password && (
            <p style={{ fontSize: "11px", color: "#f87171", marginTop: "5px" }}>{errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading || success}
          style={{
            width: "100%",
            height: "48px",
            background: success ? "#14532d" : "#d4af37",
            color: success ? "#4ade80" : "#0a0a0a",
            border: "none",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "700",
            cursor: loading || success ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "background 0.2s, transform 0.1s",
            fontFamily: "inherit",
            letterSpacing: "0.02em",
          }}
        >
          {success ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Signed in!
            </>
          ) : loading ? (
            <>
              <SpinnerIcon />
              Signing in…
            </>
          ) : "Sign in"}
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "1.5rem 0" }}>
          <div style={{ flex: 1, height: "1px", background: "#1e1e1e" }} />
          <span style={{ fontSize: "11px", color: "#333", letterSpacing: "0.05em" }}>SECURE LOGIN</span>
          <div style={{ flex: 1, height: "1px", background: "#1e1e1e" }} />
        </div>

        {/* Trust badges */}
        <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap" }}>
          {["🔒 SSL Encrypted", "UPI", "Cards", "COD"].map((label) => (
            <span key={label} style={{
              fontSize: "10px",
              padding: "4px 10px",
              borderRadius: "20px",
              background: "#111",
              border: "1px solid #1e1e1e",
              color: "#444",
            }}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}