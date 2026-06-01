import { useState } from "react";

// ─── MULTI-SELECT PILL ───────────────────────────────────────────────
function PillGroup({ options, selected, onChange }) {
  const toggle = (val) =>
    onChange(selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val]);
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            style={{
              padding: "6px 14px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.04em",
              border: active ? "1.5px solid #C9A84C" : "1.5px solid rgba(255,255,255,0.12)",
              background: active ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.03)",
              color: active ? "#D2A74B" : "rgba(255,255,255,0.55)",
              cursor: "pointer",
              transition: "all 0.15s",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ─── FIELD LABEL ────────────────────────────────────────────────────
function Label({ children, required }) {
  return (
    <label
      style={{
        display: "block",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "rgba(201,168,76,0.85)",
        marginBottom: 6,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {children}
      {required && <span style={{ color: "#C9A84C", marginLeft: 3 }}>*</span>}
    </label>
  );
}

// ─── INPUT ───────────────────────────────────────────────────────────
const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1.5px solid rgba(255,255,255,0.1)",
  borderRadius: 10,
  padding: "10px 14px",
  fontSize: 13,
  color: "#fff",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "system-ui, sans-serif",
  transition: "border-color 0.2s",
};

function Input({ ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      style={{ ...inputStyle, borderColor: focused ? "#C9A84C" : "rgba(255,255,255,0.1)" }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

// ─── TEXTAREA ────────────────────────────────────────────────────────
function Textarea({ ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      {...props}
      rows={4}
      style={{
        ...inputStyle,
        resize: "vertical",
        borderColor: focused ? "#C9A84C" : "rgba(255,255,255,0.1)",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

// ─── SELECT ──────────────────────────────────────────────────────────
function Select({ options, value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        ...inputStyle,
        borderColor: focused ? "#C9A84C" : "rgba(255,255,255,0.1)",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23C9A84C' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 14px center",
        paddingRight: 36,
        cursor: "pointer",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <option value="" disabled style={{ background: "#05110a" }}>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o} style={{ background: "#05110a", color: "#fff" }}>
          {o}
        </option>
      ))}
    </select>
  );
}

// ─── YES / NO ────────────────────────────────────────────────────────
function YesNo({ value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
      {["Yes", "No"].map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          style={{
            padding: "7px 22px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.06em",
            border: value === opt ? "1.5px solid #C9A84C" : "1.5px solid rgba(255,255,255,0.12)",
            background: value === opt ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.03)",
            color: value === opt ? "#D2A74B" : "rgba(255,255,255,0.55)",
            cursor: "pointer",
            transition: "all 0.15s",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── SECTION TITLE ───────────────────────────────────────────────────
function SectionTitle({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0 18px" }}>
      <div style={{ width: 28, height: 1, background: "#C9A84C" }} />
      <span
        style={{
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#C9A84C",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.2)" }} />
    </div>
  );
}

// ─── SUCCESS SCREEN ──────────────────────────────────────────────────
function SuccessScreen({ name, onBack }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#05110a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          border: "2px solid #C9A84C",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M7 16l7 7 11-14"
            stroke="#C9A84C"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p
        style={{
          color: "#C9A84C",
          fontSize: 10,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 12,
        }}
      >
        Request Submitted
      </p>
      <h2
        style={{
          color: "#fff",
          fontSize: 28,
          fontWeight: 700,
          margin: "0 0 12px",
          lineHeight: 1.2,
        }}
      >
        Thank you, {name || "valued guest"}.
      </h2>
      <p
        style={{
          color: "rgba(255,255,255,0.55)",
          fontSize: 14,
          maxWidth: 380,
          lineHeight: 1.7,
        }}
      >
        Our catering team will contact you within 24–48 hours to discuss menu options, pricing, and
        event details.
      </p>
      <button
        onClick={onBack}
        style={{
          marginTop: 32,
          background: "#D2A74B",
          color: "#111",
          fontWeight: 800,
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          border: "none",
          borderRadius: 10,
          padding: "12px 28px",
          cursor: "pointer",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Back to Catering
      </button>
    </div>
  );
}

// ─── ENQUIRY PAGE (default export) ───────────────────────────────────
export default function EnquiryPage({ onBack }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    eventType: "",
    eventDate: "",
    eventTime: "",
    eventLocation: "",
    guests: "",
    foodPrefs: [],
    serviceType: [],
    liveStations: [],
    budget: "",
    specialRequests: "",
    cutlery: "",
    staff: "",
    contactMethod: "",
    submitted: false,
  });

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  // Navigate to previous page; fall back to onBack prop if provided
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else if (onBack) {
      onBack();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm((f) => ({ ...f, submitted: true }));
  };

  if (form.submitted) {
    return <SuccessScreen name={form.fullName} onBack={handleBack} />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#05110a",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* ── Sticky Header ── */}
      <div
        style={{
          borderBottom: "1px solid rgba(201,168,76,0.15)",
          padding: "18px 24px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          position: "sticky",
          top: 0,
          background: "rgba(5,17,10,0.95)",
          backdropFilter: "blur(12px)",
          zIndex: 50,
        }}
      >
        <button
          onClick={handleBack}
          style={{
            background: "none",
            border: "1.5px solid rgba(201,168,76,0.3)",
            borderRadius: 8,
            padding: "6px 10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "#C9A84C",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 2L4 7l5 5"
              stroke="#C9A84C"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
        <div style={{ width: 1, height: 20, background: "rgba(201,168,76,0.2)" }} />
        <span
          style={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#C9A84C",
          }}
        >
          LeKochi · Catering Enquiry
        </span>
      </div>

      {/* ── Form Container ── */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 24px 60px" }}>
        {/* Page Header */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 28, height: 1, background: "#C9A84C" }} />
            <span
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#C9A84C",
              }}
            >
              Plan Your Event
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(26px, 6vw, 40px)",
              fontWeight: 800,
              lineHeight: 1.15,
              margin: "0 0 10px",
              color: "#fff",
            }}
          >
            Catering <span style={{ color: "#D2A74B" }}>Enquiry</span>
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Planning an event? Let LeKochi Café & Kitchen bring the flavours to your special
            occasion. Fill out the form below and our team will get back to you shortly.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* ── Contact Information ── */}
          <SectionTitle>Contact Information</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <Label required>Full Name</Label>
              <Input
                type="text"
                placeholder="Your full name"
                value={form.fullName}
                onChange={(e) => set("fullName")(e.target.value)}
                required
              />
            </div>
            <div>
              <Label required>Phone Number</Label>
              <Input
                type="tel"
                placeholder="+1 (416) 000-0000"
                value={form.phone}
                onChange={(e) => set("phone")(e.target.value)}
                required
              />
            </div>
            <div>
              <Label required>Email Address</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => set("email")(e.target.value)}
                required
              />
            </div>
          </div>

          {/* ── Event Information ── */}
          <SectionTitle>Event Information</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <Label required>Event Type</Label>
              <Select
                options={[
                  "Birthday",
                  "Wedding",
                  "Corporate Event",
                  "House Party",
                  "Religious Event",
                  "Baby Shower",
                  "Other",
                ]}
                value={form.eventType}
                onChange={set("eventType")}
                placeholder="Select event type"
              />
            </div>
            <div>
              <Label required>Event Date</Label>
              <Input
                type="date"
                value={form.eventDate}
                onChange={(e) => set("eventDate")(e.target.value)}
                required
              />
            </div>
            <div>
              <Label required>Event Time</Label>
              <Input
                type="time"
                value={form.eventTime}
                onChange={(e) => set("eventTime")(e.target.value)}
                required
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <Label required>Event Location / Address</Label>
              <Input
                type="text"
                placeholder="Full venue address"
                value={form.eventLocation}
                onChange={(e) => set("eventLocation")(e.target.value)}
                required
              />
            </div>
            <div>
              <Label required>Number of Guests</Label>
              <Input
                type="number"
                placeholder="e.g. 80"
                min="1"
                value={form.guests}
                onChange={(e) => set("guests")(e.target.value)}
                required
              />
            </div>
          </div>

          {/* ── Catering Requirements ── */}
          <SectionTitle>Catering Requirements</SectionTitle>

          <div style={{ marginBottom: 18 }}>
            <Label>Food Preferences</Label>
            <PillGroup
              options={[
                "Kerala Cuisine",
                "South Indian",
                "Hakka / Indo-Chinese",
                "Vegetarian",
                "Non-Vegetarian",
                "Custom Menu",
              ]}
              selected={form.foodPrefs}
              onChange={set("foodPrefs")}
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <Label>Service Type</Label>
            <PillGroup
              options={[
                "Pickup",
                "Delivery",
                "Full-Service Catering",
                "Live Dosa Counter",
                "Live Food Counter",
                "Live Food Truck Catering",
              ]}
              selected={form.serviceType}
              onChange={set("serviceType")}
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <Label>Live Station Options</Label>
            <PillGroup
              options={[
                "Live Dosa Station",
                "Live Chaat Counter",
                "Live Grill / BBQ",
                "Tea & Snacks Station",
                "Custom Live Counter",
              ]}
              selected={form.liveStations}
              onChange={set("liveStations")}
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <Label required>Budget Range</Label>
            <Select
              options={["Under $500", "$500 – $1,000", "$1,000 – $3,000", "$3,000+"]}
              value={form.budget}
              onChange={set("budget")}
              placeholder="Select budget range"
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <Label>Special Requests</Label>
            <Textarea
              placeholder="e.g. dietary restrictions, spice level, live station requests, serving staff, custom menu ideas, food truck setup requirements…"
              value={form.specialRequests}
              onChange={(e) => set("specialRequests")(e.target.value)}
            />
          </div>

          {/* ── Additional Details ── */}
          <SectionTitle>Additional Details</SectionTitle>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
            <div>
              <Label>Disposable Plates & Cutlery?</Label>
              <YesNo value={form.cutlery} onChange={set("cutlery")} />
            </div>
            <div>
              <Label>Serving Staff Needed?</Label>
              <YesNo value={form.staff} onChange={set("staff")} />
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <Label>Preferred Contact Method</Label>
            <PillGroup
              options={["Call", "WhatsApp", "Email"]}
              selected={form.contactMethod ? [form.contactMethod] : []}
              onChange={(arr) => set("contactMethod")(arr[arr.length - 1] || "")}
            />
          </div>

          {/* ── Submit ── */}
          <div
            style={{
              borderTop: "1px solid rgba(201,168,76,0.15)",
              paddingTop: 28,
              textAlign: "center",
            }}
          >
            <button
              type="submit"
              style={{
                background: "#D2A74B",
                color: "#111",
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                border: "none",
                borderRadius: 12,
                padding: "15px 40px",
                cursor: "pointer",
                boxShadow: "0 4px 28px rgba(210,167,75,0.45)",
                fontFamily: "system-ui, sans-serif",
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Request a Quote
            </button>
            <p
              style={{
                marginTop: 14,
                fontSize: 11,
                color: "rgba(255,255,255,0.35)",
                lineHeight: 1.6,
              }}
            >
              Our catering team will contact you within 24–48 hours to discuss menu options,
              pricing, and event details.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}