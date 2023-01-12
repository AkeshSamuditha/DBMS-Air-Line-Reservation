import React from "react";
import "../../App.css";
import Footer from "../Footer";
import "./UserProfile.css";

export default function UserProfile() {
  return (
    <>
      <div>
        <div className="userprofile">
          <h2>Welcome aboard</h2>
        </div>
        <div className="user-container">
          <div className="user">
            <i className={"fas fa-user-circle fa-9x center"} />
            <h3 className="name">John Doe</h3>
            <h5 className="membership">Platinum Member</h5>
            <br />
            <div className="lables">
              <label>Total tickets booked : </label>
              <label>Count</label>
            </div>
            <br />
            <div className="past-flights">
              <h3>PREVIOUS FLIGHTS WIHT US...</h3>
              <br />
              <div className="flight-table"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
