import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import axios from "axios";
import "./GuestUser.css";
import Navbar from "../Navbar";

function GuestUser() {
  const [titleReg, setTitleReg] = useState("");
  const [firstNameReg, setFirstNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [countryReg, setCountryReg] = useState("");
  const [telephoneReg, setTelephoneReg] = useState("");

  const port = process.env.port;
  const concatenatedString = "http://localhost:" + port + "/API/Register";

  return (
    <>
      <Navbar />
      <div className="guest-bg">
        <div className="guest-input">
          <h2>
            <center>
              Welcome!
              <br />
            </center>
          </h2>
          <br />

          <form>
            <div className="Parent">
              <div>
                <label>Title</label>
                <br />
                <select name="title" className="input-box-mr" id="title">
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Miss">Miss</option>
                </select>
              </div>
              <div>
                <label>First Name</label>
                <br />
                <input
                  className="footer-input"
                  name="first-name"
                  type="first-name"
                  placeholder="Eg: John"
                  onChange={(e) => {
                    setFirstNameReg(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div>
              <label>Last Name</label>
              <br />
              <input
                className="footer-input"
                name="last-name"
                type="last-name"
                placeholder="Eg: Doe"
                onChange={(e) => {
                  setLastNameReg(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label>Email</label>
              <br />
              <input
                className="footer-input"
                name="email"
                type="email"
                placeholder="Eg: johndoe@example.com"
                onChange={(e) => {
                  setEmailReg(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label>Telephone</label>
              <br />
              <input
                className="footer-input"
                name="tp"
                type="tp"
                placeholder="Eg: 0xx-xx-xx-xxx"
                onChange={(e) => {
                  setTelephoneReg(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label>Country</label>
              <br />
              <input
                className="footer-input"
                name="country"
                type="country"
                placeholder="Eg: USA"
                onChange={(e) => {
                  setCountryReg(e.target.value);
                }}
                required
              />
            </div>
            <div className="find-a-flight-btn">
              <Link>
                <Button
                  className="find-a-flight-btn"
                  buttonStyle="btn--black"
                  buttonSize="btn--black_size"
                >
                  Proceed
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default GuestUser;
