import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";

function Payment() {
  return (
    <div className="hero-container">
      {/* <video src="/videos/video-1.mp4" autoPlay loop muted /> */}
      <h1>Proceed with your Payment</h1>
      <p>සල්ලි දීලා පලයන්</p>
      <div className="hero-btns">
        <Link to="/">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            Pay
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Payment;
