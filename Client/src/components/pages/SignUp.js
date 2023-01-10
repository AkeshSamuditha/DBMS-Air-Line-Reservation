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
      .post("http://localhost:6969/Auth/Register", {
        Email: userNameReg,
        password: passwordReg,
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
              <label for="title">Title</label>
              <br />
              <select name="title" className="input-box-mr" id="title">
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Miss">Miss</option>
              </select>
            </div>
            <div>
              <label for="first-name">First Name</label>
              <br />
              <input
                className="footer-input"
                name="first-name"
                type="first-name"
                placeholder="Eg: John"
                required
              />
            </div>
          </div>
          <div>
            <label for="last-name">Last Name</label>
            <br />
            <input
              className="footer-input"
              name="last-name"
              type="last-name"
              placeholder="Eg: Doe"
              required
            />
          </div>
          <div>
            <label for="email">Email</label>
            <br />
            <input
              className="footer-input"
              name="email"
              type="email"
              placeholder="Eg: johndoe@example.com"
              required
            />
          </div>
          <div>
            <label for="tp">Telephone</label>
            <br />
            <input
              className="footer-input"
              name="tp"
              type="tp"
              placeholder="Eg: 0xx-xx-xx-xxx"
              required
            />
          </div>
          <div>
            <label for="country">Email</label>
            <br />
            <input
              className="footer-input"
              name="country"
              type="country"
              placeholder="Eg: USA"
              required
            />
          </div>
          <div>
            <label for="username">User Name</label>
            <br />
            <input
              className="footer-input"
              name="username"
              type="username"
              placeholder="Eg: JohnDoe"
              required
            />
          </div>
          <div>
            <label for="password">Password</label>
            <br />
            <input
              className="footer-input"
              name="password"
              type="password"
              required
            />
          </div>
          <div>
            <label for="dob">From</label>
            <br />
            <input type="date" className="input-box" id="dob" name="dob" />
          </div>
          <div>
            <label for="address">Email</label>
            <br />
            <input
              className="footer-input"
              name="address"
              type="address"
              placeholder="Eg: No x, Some Rd, Somewhere"
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
