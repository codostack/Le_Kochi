import React from "react";
import AboutHeader from "./components/Aboutheader";
import AboutContent from "./components/Aboutcontent";

export default function AboutPage() {
  return (
    <div style={{ background: "#05110a", height:"85vh" }}>
      <AboutHeader />
      <AboutContent />
    </div>
  );
}