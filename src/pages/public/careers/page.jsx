// CareersPage.js

import React from "react";
import "./careers.css";
import { FaChevronRight } from "react-icons/fa";

const positions = [
  "South Indian Chef",
  "Dosa Master",
  "Server / Cashier",
  "Kitchen Assistant",
  "Dishwasher",
  "Social Media Coordinator",
];

export default function CareersPage() {
  return (
    <div className="careers-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="overlay"></div>

        <div className="hero-content">
          <p className="small-text">CAREERS</p>

          <p className="small">Join Our Team</p>

          <p className="description">
            Build your future with LeKochi.
            <br />
            We believe in passion, growth
            <br />
            and great teamwork.
          </p>
        </div>
      </section>

      {/* TEAM IMAGE */}
      <section className="team-section">
        <img
          src="https://www.shutterstock.com/image-photo/confident-man-head-chef-posing-600nw-2577981885.jpg"
          alt="Team"
        />
      </section>

      {/* OPEN POSITIONS */}
      <section className="positions-section">
        <h2>OPEN POSITIONS</h2>

        <div className="positions-list">
          {positions.map((job, index) => (
            <div className="job-card" key={index}>
              <span>{job}</span>

              <button>
                <FaChevronRight />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}