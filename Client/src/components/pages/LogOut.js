import React from "react";
import { Link } from "react-router-dom";

function LogOut() {
  return (
    <div className="logged-out">
      <div className="logged-out-container">
        <div className="heading">
          <h1>Logged Out</h1>
        </div>
        <br />
        <div className="back-link">
          <Link to={"/"}>Go to home</Link>
        </div>
      </div>
    </div>
  );
}

export default LogOut;
