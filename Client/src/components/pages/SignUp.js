import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import axios from "axios";
import "./SignUp.css";

function SignUp() {
  const [titleReg, setTitleReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [firstNameReg, setFirstNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [countryReg, setCountryReg] = useState("");
  const [userNameReg, setUsernameReg] = useState("");
  const [birthDayReg, setBirthdayReg] = useState("");
  const [addressReg, setAddressReg] = useState("");
  const [telephoneReg, setTelephoneReg] = useState("");

  const register = () => {
    axios
      .post("http://localhost:6969/Auth/Register", {
        Email: emailReg,
        password: passwordReg,
        Title: titleReg,
        First_Name: firstNameReg,
        Last_Name: lastNameReg,
        Country: countryReg,
        Telephone: telephoneReg,
        UserName: userNameReg,
        DOB: birthDayReg,
        Address: addressReg,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="sign-up">
      <div className="input-areas-signup">
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
          <div>
            <label>User Name</label>
            <br />
            <input
              className="footer-input"
              name="username"
              type="username"
              placeholder="Eg: JohnDoe"
              onChange={(e) => {
                setUsernameReg(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <br />
            <input
              className="footer-input"
              name="password"
              type="password"
              onChange={(e) => {
                setPasswordReg(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label>Date of Birth</label>
            <br />
            <input
              type="date"
              className="input-box"
              id="dob"
              name="dob"
              onChange={(e) => {
                setBirthdayReg(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Address</label>
            <br />
            <input
              className="footer-input"
              name="address"
              type="address"
              placeholder="Eg: No x, Some Rd, Somewhere"
              onChange={(e) => {
                setAddressReg(e.target.value);
              }}
              required
            />
          </div>
        </form>
        <div className="sign-up-btns">
          <Link to={"/Auth/login"}>
            <Button
              className="btns"
              buttonStyle="btn--outline"
              buttonSize="btn--large"
              onClick={register}
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
