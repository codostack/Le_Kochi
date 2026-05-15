import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance/page";

const styles = {
    page: {
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
    },
    card: {
        background: "#111111",
        border: "1px solid #222222",
        borderRadius: "16px",
        padding: "2.5rem",
        width: "100%",
        maxWidth: "420px",
    },
    logo: {
        width: "36px",
        height: "36px",
        background: "#ffffff",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1.5rem",
    },
    heading: {
        fontSize: "22px",
        fontWeight: "600",
        color: "#ffffff",
        margin: "0 0 6px",
    },
    subtext: {
        fontSize: "14px",
        color: "#666666",
        margin: "0 0 2rem",
    },
    subLink: {
        color: "#999999",
        textDecoration: "underline",
        cursor: "pointer",
    },
    row: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px",
    },
    field: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        marginBottom: "14px",
    },
    label: {
        fontSize: "13px",
        fontWeight: "500",
        color: "#888888",
        letterSpacing: "0.01em",
    },
    input: {
        height: "42px",
        background: "#1a1a1a",
        border: "1px solid #2a2a2a",
        borderRadius: "8px",
        padding: "0 12px",
        fontSize: "14px",
        color: "#ffffff",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
        transition: "border-color 0.15s",
    },
    inputFocus: {
        borderColor: "#444444",
    },
    inputError: {
        borderColor: "#7f1d1d",
    },
    errorText: {
        fontSize: "12px",
        color: "#f87171",
        marginTop: "2px",
    },
    pwWrap: {
        position: "relative",
    },
    pwInput: {
        height: "42px",
        background: "#1a1a1a",
        border: "1px solid #2a2a2a",
        borderRadius: "8px",
        padding: "0 40px 0 12px",
        fontSize: "14px",
        color: "#ffffff",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
        transition: "border-color 0.15s",
    },
    eyeBtn: {
        position: "absolute",
        right: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "#555555",
        fontSize: "16px",
        padding: "0",
        display: "flex",
        alignItems: "center",
    },
    strengthBar: {
        height: "3px",
        background: "#222222",
        borderRadius: "4px",
        marginTop: "6px",
        overflow: "hidden",
    },
    strengthFill: (score) => ({
        height: "100%",
        borderRadius: "4px",
        width: `${score * 25}%`,
        background: ["", "#7f1d1d", "#92400e", "#065f46", "#14532d"][score],
        transition: "width 0.3s, background 0.3s",
    }),
    strengthLabel: (score) => ({
        fontSize: "11px",
        color: ["", "#f87171", "#fbbf24", "#34d399", "#4ade80"][score],
        marginTop: "4px",
    }),
    checkRow: {
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        margin: "6px 0 1.5rem",
    },
    checkbox: {
        marginTop: "2px",
        accentColor: "#ffffff",
        cursor: "pointer",
        width: "14px",
        height: "14px",
        flexShrink: 0,
    },
    checkLabel: {
        fontSize: "13px",
        color: "#666666",
        lineHeight: "1.5",
        cursor: "pointer",
    },
    submitBtn: {
        width: "100%",
        height: "44px",
        background: "#ffffff",
        color: "#0a0a0a",
        border: "none",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "background 0.15s, transform 0.1s",
        fontFamily: "inherit",
    },
    submitBtnDisabled: {
        width: "100%",
        height: "44px",
        background: "#2a2a2a",
        color: "#555555",
        border: "none",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "not-allowed",
        fontFamily: "inherit",
    },

    // ── Success screen ──
    successCard: {
        background: "#111111",
        border: "1px solid #222222",
        borderRadius: "16px",
        padding: "3rem 2.5rem",
        width: "100%",
        maxWidth: "420px",
        textAlign: "center",
    },
    successIconWrap: {
        width: "64px",
        height: "64px",
        background: "#052e16",
        border: "1px solid #14532d",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 1.5rem",
        fontSize: "28px",
        color: "#4ade80",
    },
    successBadge: {
        display: "inline-block",
        background: "#052e16",
        border: "1px solid #14532d",
        borderRadius: "20px",
        padding: "4px 14px",
        fontSize: "12px",
        color: "#4ade80",
        marginBottom: "1.25rem",
    },
    successTitle: {
        fontSize: "20px",
        fontWeight: "600",
        color: "#ffffff",
        margin: "0 0 8px",
    },
    successSub: {
        fontSize: "14px",
        color: "#666666",
        margin: "0 0 2rem",
        lineHeight: "1.7",
    },
    redirectNote: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        fontSize: "12px",
        color: "#444444",
    },
};

const validate = (fields) => {
    const errs = {};
    if (!fields.firstName.trim()) errs.firstName = "First name is required";
    if (!fields.lastName.trim()) errs.lastName = "Last name is required";
    if (!fields.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
        errs.email = "Enter a valid email";
    if (!fields.phone?.trim()) {
        errs.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(fields.phone)) {
        errs.phone = "Enter a valid 10-digit phone number";
    }
    if (!fields.password) errs.password = "Password is required";
    else if (fields.password.length < 8)
        errs.password = "Must be at least 8 characters";
    if (!fields.confirm) errs.confirm = "Please confirm your password";
    else if (fields.confirm !== fields.password)
        errs.confirm = "Passwords do not match";
    if (!fields.agreed) errs.agreed = "You must accept the terms";
    return errs;
};

const getStrength = (pw) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
};

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

export default function RegisterForm() {
    const navigate = useNavigate();

    const [fields, setFields] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirm: "",
        agreed: false,
    });
    const [errors, setErrors] = useState({});
    const [showPw, setShowPw] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [focus, setFocus] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [registeredName, setRegisteredName] = useState("");
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(3);

    const set = (key) => (e) =>
        setFields((f) => ({
            ...f,
            [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
        }));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errs = validate(fields);
        setErrors(errs);
        if (Object.keys(errs).length !== 0) return;

        try {
            setLoading(true);

            const response = await axiosInstance.post("/auth/register", {
                fullname: `${fields.firstName} ${fields.lastName}`,
                lastName: fields.lastName,
                email: fields.email,
                phone: fields.phone,
                password: fields.password,
            });

            console.log(response.data);

            // Save name before resetting form
            setRegisteredName(fields.firstName);
            setSubmitted(true);

            setFields({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                password: "",
                confirm: "",
                agreed: false,
            });

            // Countdown 3 → 2 → 1 → redirect
            let count = 3;
            const timer = setInterval(() => {
                count -= 1;
                setCountdown(count);
                if (count === 0) {
                    clearInterval(timer);
                    navigate("/customer/dashboard");
                }
            }, 1000);

        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const strength = getStrength(fields.password);

    const inp = (key, type = "text", placeholder = "") => ({
        type,
        value: fields[key],
        placeholder,
        onChange: set(key),
        onFocus: () => setFocus(key),
        onBlur: () => setFocus(""),
        style: {
            ...(type === "password" ? styles.pwInput : styles.input),
            ...(focus === key ? styles.inputFocus : {}),
            ...(errors[key] ? styles.inputError : {}),
        },
    });

    // ── Success screen ──────────────────────────────────────────────
    if (submitted) {
        return (
            <div style={styles.page}>
                <style>{`
                    @keyframes spin { to { transform: rotate(360deg); } }
                    .redir-spinner {
                        width: 12px; height: 12px;
                        border: 2px solid #2a2a2a;
                        border-top-color: #4ade80;
                        border-radius: 50%;
                        animation: spin 0.8s linear infinite;
                        display: inline-block;
                        flex-shrink: 0;
                    }
                `}</style>
                <div style={styles.successCard}>
                    <div style={styles.successIconWrap}>✓</div>
                    <span style={styles.successBadge}>Registration successful</span>
                    <h2 style={styles.successTitle}>Welcome, {registeredName}!</h2>
                    <p style={styles.successSub}>
                        Your account has been created successfully.<br />
                        Taking you to your dashboard now.
                    </p>
                    <div style={styles.redirectNote}>
                        <span className="redir-spinner" />
                        Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}…
                    </div>
                </div>
            </div>
        );
    }

    // ── Register form ───────────────────────────────────────────────
    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <div style={styles.logo}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="3" width="8" height="8" rx="1.5" fill="#0a0a0a" />
                        <rect x="13" y="3" width="8" height="8" rx="1.5" fill="#0a0a0a" />
                        <rect x="3" y="13" width="8" height="8" rx="1.5" fill="#0a0a0a" />
                        <rect x="13" y="13" width="8" height="8" rx="1.5" fill="#0a0a0a" />
                    </svg>
                </div>

                <h1 style={styles.heading}>Create an account</h1>
                <p style={styles.subtext}>
                    Already have one?{" "}
                    <span style={styles.subLink}>Sign in</span>
                </p>

                <div style={styles.row}>
                    <div style={styles.field}>
                        <label style={styles.label}>First name</label>
                        <input {...inp("firstName", "text", "John")} />
                        {errors.firstName && <span style={styles.errorText}>{errors.firstName}</span>}
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Last name</label>
                        <input {...inp("lastName", "text", "Doe")} />
                        {errors.lastName && <span style={styles.errorText}>{errors.lastName}</span>}
                    </div>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Email address</label>
                    <input {...inp("email", "email", "john@example.com")} />
                    {errors.email && <span style={styles.errorText}>{errors.email}</span>}
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Phone number</label>
                    <input {...inp("phone", "tel", "+91 .........")} />
                    {errors.phone && <span style={styles.errorText}>{errors.phone}</span>}
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Password</label>
                    <div style={styles.pwWrap}>
                        <input {...inp("password", showPw ? "text" : "password", "8+ characters")} />
                        <button
                            style={styles.eyeBtn}
                            onClick={() => setShowPw(!showPw)}
                            type="button"
                            aria-label="Toggle password"
                        >
                            <i className={`ti ti-eye${showPw ? "-off" : ""}`} aria-hidden="true" />
                        </button>
                    </div>
                    {fields.password && (
                        <>
                            <div style={styles.strengthBar}>
                                <div style={styles.strengthFill(strength)} />
                            </div>
                            <span style={styles.strengthLabel(strength)}>
                                {strengthLabels[strength]}
                            </span>
                        </>
                    )}
                    {errors.password && <span style={styles.errorText}>{errors.password}</span>}
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Confirm password</label>
                    <div style={styles.pwWrap}>
                        <input {...inp("confirm", showConfirm ? "text" : "password", "Re-enter password")} />
                        <button
                            style={styles.eyeBtn}
                            onClick={() => setShowConfirm(!showConfirm)}
                            type="button"
                            aria-label="Toggle confirm password"
                        >
                            <i className={`ti ti-eye${showConfirm ? "-off" : ""}`} aria-hidden="true" />
                        </button>
                    </div>
                    {errors.confirm && <span style={styles.errorText}>{errors.confirm}</span>}
                </div>

                <div style={styles.checkRow}>
                    <input
                        type="checkbox"
                        id="terms"
                        checked={fields.agreed}
                        onChange={set("agreed")}
                        style={styles.checkbox}
                    />
                    <label htmlFor="terms" style={styles.checkLabel}>
                        I agree to the{" "}
                        <span style={{ color: "#aaaaaa", textDecoration: "underline", cursor: "pointer" }}>
                            Terms of Service
                        </span>{" "}
                        and{" "}
                        <span style={{ color: "#aaaaaa", textDecoration: "underline", cursor: "pointer" }}>
                            Privacy Policy
                        </span>
                    </label>
                </div>
                {errors.agreed && (
                    <span style={{ ...styles.errorText, display: "block", marginTop: "-10px", marginBottom: "12px" }}>
                        {errors.agreed}
                    </span>
                )}

                <button
                    style={loading ? styles.submitBtnDisabled : styles.submitBtn}
                    onClick={handleSubmit}
                    disabled={loading}
                    onMouseOver={(e) => { if (!loading) e.currentTarget.style.background = "#e5e5e5"; }}
                    onMouseOut={(e) => { if (!loading) e.currentTarget.style.background = "#ffffff"; }}
                    onMouseDown={(e) => { if (!loading) e.currentTarget.style.transform = "scale(0.98)"; }}
                    onMouseUp={(e) => { if (!loading) e.currentTarget.style.transform = "scale(1)"; }}
                >
                    {loading ? "Creating account…" : "Create account"}
                </button>
            </div>
        </div>
    );
}