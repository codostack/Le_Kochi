// Register.jsx
// Matches the dark/gold design system from foodHelpers.jsx
// Preserves cart state in sessionStorage across auth redirects

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../../axiosInstance/page";

/* ── icons ────────────────────────────────────────────────── */
const EyeIcon = ({ open }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
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

/* ── validation ───────────────────────────────────────────── */
const validate = (f) => {
  const e = {};
  if (!f.firstName.trim()) e.firstName = "Required";
  if (!f.lastName.trim()) e.lastName = "Required";
  if (!f.email.trim()) e.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email";
  if (!f.phone.trim()) e.phone = "Phone is required";
  else if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = "Enter a valid 10-digit number";
  if (!f.password) e.password = "Password is required";
  else if (f.password.length < 8) e.password = "At least 8 characters";
  if (!f.confirm) e.confirm = "Please confirm your password";
  else if (f.confirm !== f.password) e.confirm = "Passwords do not match";
  return e;
};

const getStrength = (pw) => {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
};

const STRENGTH_COLORS = ["", "#7f1d1d", "#92400e", "#065f46", "#14532d"];
const STRENGTH_TEXT = ["", "#f87171", "#fbbf24", "#34d399", "#4ade80"];
const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/customer/account";

  const empty = { firstName: "", lastName: "", email: "", phone: "", password: "", confirm: "", agreed: false };
  const [fields, setFields] = useState(empty);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [registeredName, setRegisteredName] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [shake, setShake] = useState(false);

  const set = (key) => (e) =>
    setFields((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const strength = getStrength(fields.password);

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
      const response = await axiosInstance.post("/auth/register", {
        fullname: `${fields.firstName} ${fields.lastName}`,
        lastName: fields.lastName,
        email: fields.email,
        phone: fields.phone,
        password: fields.password,
      });

      const token = response.data.token || response.data.access_token;
      if (token) localStorage.setItem("token", token);

      setRegisteredName(fields.firstName);
      setSubmitted(true);
      setFields(empty);

      let count = 3;
      const timer = setInterval(() => {
        count -= 1;
        setCountdown(count);
        if (count === 0) {
          clearInterval(timer);
          sessionStorage.removeItem("pending_cart");
          navigate(from, { replace: true });
        }
      }, 1000);

      try {
        const pendingCart = localStorage.getItem("pending_cart");
        if (pendingCart) {
          localStorage.setItem("cart", pendingCart);
          localStorage.removeItem("pending_cart");
        }
      } catch (_) { }

    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong. Please try again.";
      setErrors({ form: msg });
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  /* ── field style factory ─────────────────────────────────── */
  const fieldStyle = (key) => ({
    width: "100%",
    height: "44px",
    background: "#111",
    border: `1px solid ${errors[key] ? "#7f1d1d" : focused === key ? "#d4af37" : "#222"}`,
    borderRadius: "10px",
    padding: "0 13px",
    fontSize: "13px",
    color: "#fff",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  });

  const bindInput = (key, type = "text", placeholder = "") => ({
    type,
    value: fields[key],
    placeholder,
    onChange: set(key),
    onFocus: () => setFocused(key),
    onBlur: () => setFocused(""),
    style: type === "password"
      ? { ...fieldStyle(key), paddingRight: "44px" }
      : fieldStyle(key),
  });

  /* ── success screen ──────────────────────────────────────── */
  if (submitted) {
    return (
      <div style={PAGE}>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div style={{ ...CARD, textAlign: "center", animation: "fadeUp 0.35s ease" }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "50%",
            background: "#052e16", border: "1px solid #14532d",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.25rem",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span style={{
            display: "inline-block", background: "#052e16",
            border: "1px solid #14532d", borderRadius: "20px",
            padding: "4px 14px", fontSize: "11px", color: "#4ade80",
            marginBottom: "1rem", letterSpacing: "0.05em",
          }}>Account created successfully</span>
          <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#fff", margin: "0 0 8px" }}>
            Welcome, {registeredName}!
          </h2>
          <p style={{ fontSize: "13px", color: "#555", margin: "0 0 2rem", lineHeight: "1.7" }}>
            Your account is ready. Taking you to your dashboard now.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="#4ade80" strokeWidth="2"
              style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <span style={{ fontSize: "12px", color: "#444" }}>
              Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}…
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* ── register form ───────────────────────────────────────── */
  return (
    <div style={PAGE}>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .reg-card{animation:fadeUp 0.35s ease both}
        .reg-card.shake{animation:shake 0.45s ease}
        .sub-btn:hover:not(:disabled){background:#f0c842!important}
        .sub-btn:active:not(:disabled){transform:scale(0.98)}
        .lnk{background:none;border:none;cursor:pointer;padding:0;font-family:inherit}
        .eye-btn{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#555;display:flex;align-items:center;padding:0}
        .eye-btn:hover{color:#d4af37}
      `}</style>

      <div className={`reg-card${shake ? " shake" : ""}`} style={CARD}>

        {/* Brand mark */}
        <div style={{
          width: "42px", height: "42px",
          background: "#1a1a0a", border: "1px solid #2e2a10",
          borderRadius: "11px",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: "1.5rem",
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#d4af37" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#d4af37" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>

        <h1 style={{ fontSize: "21px", fontWeight: "700", color: "#fff", margin: "0 0 5px" }}>
          Create an account
        </h1>
        <p style={{ fontSize: "13px", color: "#555", margin: "0 0 1.75rem" }}>
          Already have one?{" "}
          <button className="lnk"
            onClick={() => navigate("/login", { state: { from } })}
            style={{ color: "#d4af37", fontSize: "13px", textDecoration: "underline" }}>
            Sign in
          </button>
        </p>

        {/* Form error */}
        {errors.form && (
          <div style={{
            background: "#1a0808", border: "1px solid #7f1d1d",
            borderRadius: "10px", padding: "10px 14px",
            marginBottom: "1.25rem",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="#f87171" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span style={{ fontSize: "12px", color: "#f87171" }}>{errors.form}</span>
          </div>
        )}

        {/* Name row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "1rem" }}>
          {[["firstName", "First name", "John"], ["lastName", "Last name", "Doe"]].map(([key, label, ph]) => (
            <div key={key}>
              <Label>{label}</Label>
              <input {...bindInput(key, "text", ph)} />
              {errors[key] && <Err>{errors[key]}</Err>}
            </div>
          ))}
        </div>

        {/* Email */}
        <div style={{ marginBottom: "1rem" }}>
          <Label>Email address</Label>
          <input {...bindInput("email", "email", "john@example.com")} />
          {errors.email && <Err>{errors.email}</Err>}
        </div>

        {/* Phone */}
        <div style={{ marginBottom: "1rem" }}>
          <Label>Phone number</Label>
          <input {...bindInput("phone", "tel", "9876543210")} />
          {errors.phone && <Err>{errors.phone}</Err>}
        </div>

        {/* Password */}
        <div style={{ marginBottom: "1rem" }}>
          <Label>Password</Label>
          <div style={{ position: "relative" }}>
            <input {...bindInput("password", showPw ? "text" : "password", "8+ characters")} />
            <button className="eye-btn" type="button" onClick={() => setShowPw(!showPw)}
              aria-label="Toggle password">
              <EyeIcon open={showPw} />
            </button>
          </div>
          {fields.password && (
            <>
              <div style={{ height: "3px", background: "#222", borderRadius: "4px", marginTop: "6px", overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: "4px",
                  width: `${strength * 25}%`,
                  background: STRENGTH_COLORS[strength],
                  transition: "width 0.3s, background 0.3s",
                }} />
              </div>
              <span style={{ fontSize: "11px", color: STRENGTH_TEXT[strength], marginTop: "3px", display: "block" }}>
                {STRENGTH_LABELS[strength]}
              </span>
            </>
          )}
          {errors.password && <Err>{errors.password}</Err>}
        </div>

        {/* Confirm password */}
        <div style={{ marginBottom: "1.5rem" }}>
          <Label>Confirm password</Label>
          <div style={{ position: "relative" }}>
            <input {...bindInput("confirm", showConfirm ? "text" : "password", "Re-enter password")} />
            <button className="eye-btn" type="button" onClick={() => setShowConfirm(!showConfirm)}
              aria-label="Toggle confirm password">
              <EyeIcon open={showConfirm} />
            </button>
          </div>
          {errors.confirm && <Err>{errors.confirm}</Err>}
        </div>

        {/* Submit */}
        <button
          className="sub-btn"
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%", height: "48px",
            background: loading ? "#1a1500" : "#d4af37",
            color: loading ? "#d4af37" : "#0a0a0a",
            border: loading ? "1px solid #2a2000" : "none",
            borderRadius: "12px",
            fontSize: "14px", fontWeight: "700",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            transition: "background 0.2s, transform 0.1s",
            fontFamily: "inherit",
          }}
        >
          {loading ? (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                style={{ animation: "spin 0.8s linear infinite" }}>
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Creating account…
            </>
          ) : "Create account"}
        </button>

        {/* Footer note */}
        <p style={{ fontSize: "10px", color: "#333", textAlign: "center", marginTop: "1.25rem" }}>
          🔒 Your data is encrypted and secure
        </p>
      </div>
    </div>
  );
}

/* ── tiny layout constants ───────────────────────────────── */
const PAGE = {
  minHeight: "100vh",
  background: "#0a0a0a",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
  fontFamily: "'Inter', 'Segoe UI', sans-serif",
};

const CARD = {
  background: "#111",
  border: "1px solid #1e1e1e",
  borderRadius: "20px",
  padding: "2.5rem",
  width: "100%",
  maxWidth: "420px",
};

/* ── tiny styled sub-components ─────────────────────────── */
const Label = ({ children }) => (
  <p style={{
    fontSize: "11px", fontWeight: "600", color: "#666",
    letterSpacing: "0.06em", textTransform: "uppercase",
    margin: "0 0 7px"
  }}>
    {children}
  </p>
);

const Err = ({ children, style }) => (
  <p style={{ fontSize: "11px", color: "#f87171", margin: "4px 0 0", ...style }}>
    {children}
  </p>
);