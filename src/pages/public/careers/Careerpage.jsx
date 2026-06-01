import { useState, useRef } from "react";

// ─── FIELD LABEL ─────────────────────────────────────────────────────
function Label({ children, required }) {
  return (
    <label style={{
      display: "block", fontSize: 11, fontWeight: 700,
      letterSpacing: "0.12em", textTransform: "uppercase",
      color: "rgba(201,168,76,0.85)", marginBottom: 6,
    }}>
      {children}
      {required && <span style={{ color: "#C9A84C", marginLeft: 3 }}>*</span>}
    </label>
  );
}

// ─── BASE INPUT STYLE ────────────────────────────────────────────────
const baseInput = {
  width: "100%", background: "rgba(255,255,255,0.04)",
  border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 10,
  padding: "10px 14px", fontSize: 13, color: "#fff", outline: "none",
  boxSizing: "border-box", fontFamily: "system-ui", transition: "border-color 0.2s",
};

function FInput(props) {
  const [focused, setFocused] = useState(false);
  return (
    <input {...props}
      style={{ ...baseInput, borderColor: focused ? "#C9A84C" : "rgba(255,255,255,0.1)" }}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
  );
}

function FTextarea({ rows = 4, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea {...props} rows={rows}
      style={{ ...baseInput, resize: "vertical", borderColor: focused ? "#C9A84C" : "rgba(255,255,255,0.1)" }}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
  );
}

function FSelect({ options, value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      style={{
        ...baseInput,
        borderColor: focused ? "#C9A84C" : "rgba(255,255,255,0.1)",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23C9A84C' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
        paddingRight: 36, cursor: "pointer",
      }}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      <option value="" disabled style={{ background: "#05110a" }}>{placeholder}</option>
      {options.map((o) => <option key={o} value={o} style={{ background: "#05110a", color: "#fff" }}>{o}</option>)}
    </select>
  );
}

// ─── PILL GROUP ───────────────────────────────────────────────────────
function PillGroup({ options, selected, onChange, single = false }) {
  const toggle = (val) => {
    if (single) { onChange(val === selected ? "" : val); return; }
    onChange(selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val]);
  };
  const isActive = (val) => single ? selected === val : selected.includes(val);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
      {options.map((opt) => (
        <button key={opt} type="button" onClick={() => toggle(opt)}
          style={{
            padding: "6px 16px", borderRadius: 999, fontSize: 12, fontWeight: 600,
            letterSpacing: "0.03em",
            border: isActive(opt) ? "1.5px solid #C9A84C" : "1.5px solid rgba(255,255,255,0.12)",
            background: isActive(opt) ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.03)",
            color: isActive(opt) ? "#D2A74B" : "rgba(255,255,255,0.55)",
            cursor: "pointer", transition: "all 0.15s",
          }}>
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── FILE UPLOAD ──────────────────────────────────────────────────────
function FileUpload({ label, accept, value, onChange, optional }) {
  const ref = useRef();
  const [drag, setDrag] = useState(false);
  return (
    <div>
      <Label required={!optional}>{label}{optional && <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400, textTransform: "none", letterSpacing: 0, marginLeft: 6, fontSize: 10 }}>(optional)</span>}</Label>
      <div
        onClick={() => ref.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) onChange(f); }}
        style={{
          border: drag ? "1.5px solid #C9A84C" : "1.5px dashed rgba(201,168,76,0.3)",
          borderRadius: 10, padding: "18px 16px", textAlign: "center",
          cursor: "pointer", transition: "all 0.15s",
          background: drag ? "rgba(201,168,76,0.06)" : "rgba(255,255,255,0.02)",
        }}>
        <input ref={ref} type="file" accept={accept} style={{ display: "none" }}
          onChange={(e) => e.target.files[0] && onChange(e.target.files[0])} />
        {value ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l4 4 6-7" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 13, color: "#D2A74B", fontWeight: 600 }}>{value.name}</span>
            <button type="button" onClick={(e) => { e.stopPropagation(); onChange(null); }}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: 16, lineHeight: 1, padding: 0 }}>×</button>
          </div>
        ) : (
          <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto 8px", display: "block" }}>
              <path d="M12 16V8m0 0l-3 3m3-3l3 3" stroke="rgba(201,168,76,0.6)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="3" y="3" width="18" height="18" rx="4" stroke="rgba(201,168,76,0.3)" strokeWidth="1.4" />
            </svg>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0 }}>
              Click to upload or drag & drop
            </p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", margin: "4px 0 0" }}>
              {accept === ".pdf,.doc,.docx" ? "PDF, DOC, DOCX" : "PDF, JPG, PNG or paste link below"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SECTION TITLE ────────────────────────────────────────────────────
function SectionTitle({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "32px 0 20px" }}>
      <div style={{ width: 28, height: 1, background: "#C9A84C" }} />
      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase", color: "#C9A84C" }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.2)" }} />
    </div>
  );
}

// ─── CAREER PAGE ──────────────────────────────────────────────────────
export default function CareerPage() {
  const [form, setForm] = useState({
    fullName: "", phone: "", email: "", city: "", position: "",
    startDate: "", workType: "", availableDays: [], weekendAvail: "",
    prevExperience: "", yearsExp: "", languages: "", socialMedia: "",
    resume: null, portfolioFile: null, portfolioLink: "",
    whyJoin: "", anythingElse: "",
    submitted: false,
  });

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  if (form.submitted) {
    return (
      <div style={{
        minHeight: "100vh", background: "#05110a", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "40px 24px",
        textAlign: "center", fontFamily: "system-ui",
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%", border: "2px solid #C9A84C",
          display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24,
        }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M7 16l7 7 11-14" stroke="#C9A84C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p style={{ color: "#C9A84C", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>
          Application Received
        </p>
        <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 700, margin: "0 0 12px", lineHeight: 1.3 }}>
          Thank you, {form.fullName || "valued applicant"}.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, maxWidth: 400, lineHeight: 1.8, margin: "0 0 32px" }}>
          We've received your application for <strong style={{ color: "rgba(255,255,255,0.75)" }}>{form.position || "the position"}</strong>. Our team will review it and be in touch within a few days.
        </p>
        <p style={{ color: "rgba(201,168,76,0.6)", fontSize: 13, fontStyle: "italic", maxWidth: 380, lineHeight: 1.7 }}>
          "Become part of a growing modern café culture inspired by the flavours of Kerala."
        </p>
        <button onClick={() => setForm((f) => ({ ...f, submitted: false }))}
          style={{
            marginTop: 32, background: "#D2A74B", color: "#111", fontWeight: 800, fontSize: 11,
            letterSpacing: "0.18em", textTransform: "uppercase", border: "none", borderRadius: 10,
            padding: "12px 28px", cursor: "pointer",
          }}>
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#05110a", color: "#fff", fontFamily: "system-ui" }}>

      {/* ── Top Banner ── */}
      <div style={{
        background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(5,17,10,0) 60%)",
        borderBottom: "1px solid rgba(201,168,76,0.12)",
        padding: "48px 24px 40px",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        {/* Ambient glow */}
        <div style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 400, height: 200, background: "rgba(201,168,76,0.06)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />

        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 24, height: 1, background: "#C9A84C" }} />
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A84C" }}>
            Join Our Team
          </span>
          <div style={{ width: 24, height: 1, background: "#C9A84C" }} />
        </div>

        <h1 style={{ fontSize: "clamp(28px, 6vw, 44px)", fontWeight: 800, margin: "0 0 10px", color: "#fff", lineHeight: 1.15 }}>
          Careers at <span style={{ color: "#D2A74B" }}>LeKochi</span>
        </h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "0 auto", lineHeight: 1.8 }}>
          We're looking for passionate, energetic people to join our café family. If you love food, people, and good vibes — we'd love to hear from you.
        </p>

        {/* Role tags */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginTop: 20 }}>
          {["Barista", "Kitchen Staff", "Server", "Cashier", "Event Crew", "Delivery"].map((r) => (
            <span key={r} style={{
              padding: "4px 14px", borderRadius: 999, fontSize: 11, fontWeight: 600,
              border: "1px solid rgba(201,168,76,0.2)", color: "rgba(201,168,76,0.7)",
              background: "rgba(201,168,76,0.05)",
            }}>{r}</span>
          ))}
        </div>
      </div>

      {/* ── Form ── */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "8px 24px 80px" }}>
        <form onSubmit={(e) => { e.preventDefault(); setForm((f) => ({ ...f, submitted: true })); }}>

          {/* ── Personal Information ── */}
          <SectionTitle>Personal Information</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <Label required>Full Name</Label>
              <FInput type="text" placeholder="Your full name" value={form.fullName} onChange={(e) => set("fullName")(e.target.value)} required />
            </div>
            <div>
              <Label required>Phone Number</Label>
              <FInput type="tel" placeholder="+1 (416) 000-0000" value={form.phone} onChange={(e) => set("phone")(e.target.value)} required />
            </div>
            <div>
              <Label required>Email Address</Label>
              <FInput type="email" placeholder="you@example.com" value={form.email} onChange={(e) => set("email")(e.target.value)} required />
            </div>
            <div>
              <Label required>City</Label>
              <FInput type="text" placeholder="e.g. Toronto, Mississauga" value={form.city} onChange={(e) => set("city")(e.target.value)} required />
            </div>
            <div>
              <Label required>Preferred Position</Label>
              <FSelect
                options={["Barista", "Kitchen Staff", "Server", "Cashier", "Event Crew", "Delivery", "Other"]}
                value={form.position} onChange={set("position")} placeholder="Select a role" />
            </div>
          </div>

          {/* ── Work Availability ── */}
          <SectionTitle>Work Availability</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <Label required>Available Start Date</Label>
              <FInput type="date" value={form.startDate} onChange={(e) => set("startDate")(e.target.value)} required />
            </div>
            <div>
              <Label required>Employment Type</Label>
              <PillGroup
                options={["Full-Time", "Part-Time"]}
                selected={form.workType}
                onChange={set("workType")}
                single />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <Label>Available Days</Label>
              <PillGroup
                options={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                selected={form.availableDays}
                onChange={set("availableDays")} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <Label>Weekend Availability</Label>
              <PillGroup
                options={["Available", "Not Available", "Flexible"]}
                selected={form.weekendAvail}
                onChange={set("weekendAvail")}
                single />
            </div>
          </div>

          {/* ── Experience ── */}
          <SectionTitle>Experience</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <Label>Previous Restaurant / Café Experience</Label>
              <FTextarea rows={3}
                placeholder="Tell us about any previous food service or hospitality experience…"
                value={form.prevExperience} onChange={(e) => set("prevExperience")(e.target.value)} />
            </div>
            <div>
              <Label>Years of Experience</Label>
              <FSelect
                options={["Less than 1 year", "1–2 years", "3–5 years", "5+ years"]}
                value={form.yearsExp} onChange={set("yearsExp")} placeholder="Select range" />
            </div>
            <div>
              <Label>Languages Spoken</Label>
              <FInput type="text" placeholder="e.g. English, Malayalam, Tamil" value={form.languages} onChange={(e) => set("languages")(e.target.value)} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <Label>Social Media / Content Skills <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400, textTransform: "none", letterSpacing: 0, fontSize: 11 }}>(optional)</span></Label>
              <FInput type="text" placeholder="e.g. Instagram content, Reels, photography, graphic design"
                value={form.socialMedia} onChange={(e) => set("socialMedia")(e.target.value)} />
            </div>
          </div>

          {/* ── Uploads ── */}
          <SectionTitle>Upload Section</SectionTitle>
          <div style={{ display: "grid", gap: 16 }}>
            <FileUpload
              label="Resume"
              accept=".pdf,.doc,.docx"
              value={form.resume}
              onChange={set("resume")} />

            <div>
              <Label>Portfolio / Instagram Profile <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400, textTransform: "none", letterSpacing: 0, fontSize: 10 }}>(optional)</span></Label>
              <FInput type="url" placeholder="https://instagram.com/yourprofile or portfolio link"
                value={form.portfolioLink} onChange={(e) => set("portfolioLink")(e.target.value)} />
            </div>
          </div>

          {/* ── Additional Information ── */}
          <SectionTitle>Additional Information</SectionTitle>
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <Label required>Why would you like to join LeKochi Café & Kitchen?</Label>
              <FTextarea rows={4}
                placeholder="Tell us what excites you about LeKochi and why you'd be a great fit…"
                value={form.whyJoin} onChange={(e) => set("whyJoin")(e.target.value)} required />
            </div>
            <div>
              <Label>Anything else you'd like us to know?</Label>
              <FTextarea rows={3}
                placeholder="Any other skills, hobbies, or details you'd like to share…"
                value={form.anythingElse} onChange={(e) => set("anythingElse")(e.target.value)} />
            </div>
          </div>

          {/* ── Closing Note ── */}
          <div style={{
            margin: "32px 0 28px", padding: "20px 22px",
            background: "rgba(201,168,76,0.05)",
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: 12, textAlign: "center",
          }}>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.8, margin: "0 0 6px" }}>
              Become part of a growing modern café culture inspired by the flavours of Kerala.
            </p>
            <p style={{ color: "rgba(201,168,76,0.7)", fontSize: 12, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
              We believe in teamwork, positive energy, and creating unforgettable customer experiences.
            </p>
          </div>

          {/* ── Submit ── */}
          <div style={{ borderTop: "1px solid rgba(201,168,76,0.15)", paddingTop: 28, textAlign: "center" }}>
            <button type="submit" style={{
              background: "#D2A74B", color: "#111", fontWeight: 800, fontSize: 12,
              letterSpacing: "0.2em", textTransform: "uppercase", border: "none",
              borderRadius: 12, padding: "15px 44px", cursor: "pointer",
              boxShadow: "0 4px 28px rgba(210,167,75,0.4)",
            }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}>
              Submit Application
            </button>
            <p style={{ marginTop: 12, fontSize: 11, color: "rgba(255,255,255,0.25)", lineHeight: 1.6 }}>
              We review every application carefully and aim to respond within 3–5 business days.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}