import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import axios from "axios";
import "./SignUp.css";

function SignUp() {
  const [userNameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const register = () => {
    axios
      .post("http://localhost:3001/register", {
        email: userNameReg,
        password: passwordReg,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="sign-up">
      <div className="input-areas">
        <select name="from" className="input-box-mr" id="from">
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Ms">Ms</option>
          <option value="Miss">Miss</option>
        </select>
        <form>
          <input
            className="footer-input"
            name="email"
            type="email"
            onChange={(e) => {
              setUsernameReg(e.target.value);
            }}
            placeholder="Your Email"
          />
        </form>
        <form>
          <input
            className="footer-input"
            name="password"
            type="password"
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
            placeholder="Password"
          />
        </form>
        <div className="sign-up-btns">
          <Link to={"/log-in"}>
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
