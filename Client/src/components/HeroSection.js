import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="hero-container">
      {/* <video src="/videos/video-1.mp4" autoPlay loop muted /> */}
      <h1>A WHOLE JOURNEY AWAITS YOU</h1>
      <p>What are you waiting for?</p>
      <div className="hero-btns">
        <Link to="/api/BookFlight">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            BOOK A FLIGHT
          </Button>
        </Link>

        <Link to="/flight-status">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            CHECK FLIGHT STATUS
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
