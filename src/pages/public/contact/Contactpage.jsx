import React from 'react';

export default function ContactPage() {
  return (
    <>
      {/* Google Fonts and Responsive Breakpoints */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400&family=Playfair+Display:wght@700;900&display=swap');
          
          /* Desktop Layout (Screens wider than 768px) */
          @media (min-width: 768px) {
            .grid-container {
              flex-direction: row !important;
              gap: 60px !important;
              text-align: left;
            }
            .info-list {
              flex: 1;
              align-items: flex-start !important;
            }
            .map-wrap {
              flex: 1.2;
              height: 450px !important;
            }
            .contact-title {
              font-size: 52px !important;
            }
          }

          /* Mobile adjustments */
          @media (max-width: 767px) {
            .grid-container {
              flex-direction: column !important;
              gap: 40px !important;
            }
            .info-list {
              align-items: flex-start;
              width: 100%;
            }
            .map-wrap {
              height: 250px !important;
              width: 100%;
            }
          }
        `}
      </style>

      <section style={styles.contactSection}>
        <div style={styles.contentWrapper}>
          
          {/* HEADER */}
          <div style={styles.header}>
            <h1 className="contact-title" style={styles.contactTitle}>CONTACT US</h1>
            <p style={styles.contactSub}>We'd love to hear from you!</p>
          </div>

          {/* RESPONSIVE GRID */}
          <div className="grid-container" style={styles.gridContainer}>
            
            {/* CONTACT INFO */}
            <div className="info-list" style={styles.infoList}>
              {/* Address */}
              <div style={styles.infoRow}>
                <span style={styles.iconWrap}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="10" r="3" stroke="#c8821e" strokeWidth="1.5" />
                    <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 14 8 14s8-8.75 8-14c0-4.42-3.58-8-8-8z" stroke="#c8821e" strokeWidth="1.5" />
                  </svg>
                </span>
                <div style={styles.infoText}>
                  <span style={styles.infoLine}>17 Advance Boulevard,</span>
                  <span style={styles.infoLine}>Brampton, ON L6T 4Z6</span>
                </div>
              </div>

              {/* Phone */}
              <div style={styles.infoRow}>
                <span style={styles.iconWrap}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="#c8821e" strokeWidth="1.5" />
                  </svg>
                </span>
                <span style={styles.infoTextSingle}>(905) 456-2015</span>
              </div>

              {/* Email */}
              <div style={styles.infoRow}>
                <span style={styles.iconWrap}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#c8821e" strokeWidth="1.5" />
                    <path d="M3 7l9 6 9-6" stroke="#c8821e" strokeWidth="1.5" />
                  </svg>
                </span>
                <span style={styles.infoTextSingle}>info@lekochi.ca</span>
              </div>

              {/* Website */}
              <div style={styles.infoRow}>
                <span style={styles.iconWrap}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#c8821e" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="4" stroke="#c8821e" strokeWidth="1.5" />
                  </svg>
                </span>
                <span style={styles.infoTextSingle}>www.lekochi.ca</span>
              </div>

              {/* Hours */}
              <div style={styles.infoRow}>
                <span style={styles.iconWrap}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#c8821e" strokeWidth="1.5" />
                    <path d="M12 7v5l3 3" stroke="#c8821e" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <div style={styles.infoText}>
                  <span style={styles.infoLine}>11:00 AM – 11:00 PM</span>
                  <span style={styles.infoLine}>Everyday</span>
                </div>
              </div>
            </div>

            {/* MAP */}
            <div className="map-wrap" style={styles.mapWrap}>
              <iframe
                title="LeKochi Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.2834784406243!2d-79.684144323415!3d43.7046467710996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3967d7107777%3A0x6d953a9686036814!2s17%20Advance%20Blvd%2C%20Brampton%2C%20ON%20L6T%204Z6!5e0!3m2!1sen!2sca!4v1714200000000!5m2!1sen!2sca"
                style={styles.mapIframe}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

const styles = {
  contactSection: {
    minHeight: "100vh",
    background: "radial-gradient(circle at center, #000000 0%, #0c0c0c 100%)",
    color: "#f5efe6",
    fontFamily: "'DM Sans', sans-serif",
    display: "flex",
    justifyContent: "center",
    padding: "60px 24px",
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "1100px",
  },
  header: {
    textAlign: "center",
    marginBottom: "50px",
  },
  contactTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "32px",
    fontWeight: 900,
    color: "#c8821e",
    letterSpacing: "3px",
    marginBottom: "12px",
  },
  contactSub: {
    fontSize: "16px",
    fontWeight: 300,
    opacity: 0.9,
  },
  gridContainer: {
    display: "flex",
    alignItems: "center",
  },
  infoList: {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  infoRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "20px",
  },
  iconWrap: {
    flexShrink: 0,
    marginTop: "2px",
  },
  infoText: {
    display: "flex",
    flexDirection: "column",
  },
  infoLine: {
    fontSize: "17px",
    lineHeight: "1.5",
  },
  infoTextSingle: {
    fontSize: "17px",
  },
  mapWrap: {
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid rgba(200,130,30,0.3)",
    boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
  },
  mapIframe: {
    width: "100%",
    height: "100%",
    border: "none",
  },
};