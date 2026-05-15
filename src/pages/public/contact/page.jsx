export default function ContactPage() {
  return (
    <section style={styles.contactSection}>
      <h1 style={styles.contactTitle}>CONTACT US</h1>

      <p style={styles.contactSub}>
        We'd love to hear from you!
      </p>

      {/* INFO LIST */}
      <div style={styles.infoList}>

        {/* Address */}
        <div style={styles.infoRow}>
          <span style={styles.iconWrap}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="10"
                r="3"
                stroke="#c8821e"
                strokeWidth="2"
              />

              <path
                d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 14 8 14s8-8.75 8-14c0-4.42-3.58-8-8-8z"
                stroke="#c8821e"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </span>

          <div style={styles.infoText}>
            <span style={styles.infoLine}>
              17 Advance Boulevard,
            </span>

            <span style={styles.infoLine}>
              Brampton, ON L6T 4Z6
            </span>
          </div>
        </div>

        {/* Phone */}
        <div style={styles.infoRow}>
          <span style={styles.iconWrap}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
                stroke="#c8821e"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </span>

          <span style={styles.infoTextSingle}>
            (905) 456-2015
          </span>
        </div>

        {/* Email */}
        <div style={styles.infoRow}>
          <span style={styles.iconWrap}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect
                x="2"
                y="4"
                width="20"
                height="16"
                rx="2"
                stroke="#c8821e"
                strokeWidth="2"
              />

              <path
                d="M2 7l10 7 10-7"
                stroke="#c8821e"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <span style={styles.infoTextSingle}>
            info@lekochi.ca
          </span>
        </div>

        {/* Website */}
        <div style={styles.infoRow}>
          <span style={styles.iconWrap}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="5"
                stroke="#c8821e"
                strokeWidth="2"
              />

              <circle
                cx="12"
                cy="12"
                r="4"
                stroke="#c8821e"
                strokeWidth="2"
              />

              <circle
                cx="17.5"
                cy="6.5"
                r="1"
                fill="#c8821e"
              />
            </svg>
          </span>

          <span style={styles.infoTextSingle}>
            www.lekochi.ca
          </span>
        </div>

        {/* Hours */}
        <div style={styles.infoRow}>
          <span style={styles.iconWrap}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="#c8821e"
                strokeWidth="2"
              />

              <path
                d="M12 7v5l3 3"
                stroke="#c8821e"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <div style={styles.infoText}>
            <span style={styles.infoLine}>
              11:00 AM – 11:00 PM
            </span>

            <span style={styles.infoLine}>
              Everyday
            </span>
          </div>
        </div>
      </div>

      {/* MAP */}
      <div style={styles.mapWrap}>
        <iframe
          title="LeKochi Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.123456789!2d-79.7500!3d43.6800!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3d5c5c5c5c5c%3A0x0!2s17+Advance+Blvd%2C+Brampton%2C+ON+L6T+4Z6!5e0!3m2!1sen!2sca!4v1234567890"
          style={styles.mapIframe}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

const styles = {
  contactSection: {
    minHeight: "100vh",
    background: "#0f1a0f",
    color: "#f5efe6",
    fontFamily: "'DM Sans', sans-serif",
    padding: "36px 28px 40px",
    maxWidth: 430,
    margin: "0 auto",
  },

  contactTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 32,
    fontWeight: 900,
    color: "#c8821e",
    letterSpacing: 3,
    textAlign: "center",
    marginBottom: 8,
  },

  contactSub: {
    fontSize: 15,
    color: "#f5efe6",
    textAlign: "center",
    marginBottom: 36,
    fontWeight: 300,
  },

  infoList: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    marginBottom: 32,
  },

  infoRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 18,
  },

  iconWrap: {
    flexShrink: 0,
    marginTop: 1,
    lineHeight: 0,
  },

  infoText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  infoLine: {
    fontSize: 16,
    color: "#f5efe6",
    fontWeight: 400,
    lineHeight: 1.5,
  },

  infoTextSingle: {
    fontSize: 16,
    color: "#f5efe6",
    fontWeight: 400,
    lineHeight: 1.6,
  },

  mapWrap: {
    borderRadius: 14,
    overflow: "hidden",
    border: "1px solid rgba(200,130,30,0.25)",
    position: "relative",
    height: 200,
    background: "#1a2a1a",
  },

  mapIframe: {
    width: "100%",
    height: "100%",
    border: "none",
    display: "block",
  },
};