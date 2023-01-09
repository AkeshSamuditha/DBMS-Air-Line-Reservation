import React, { useState } from "react";
import "../../App.css";
import "./LogIn.css";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import "./../Button.css";
import axios from "axios";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const login = () => {
    axios
      .post("http://localhost:3001/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          setLoginStatus(response.data[0].email);
          handleSubmit();
        }
      });
  };

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <div>
          <h1>You are logged in</h1>
          <Link to={"/"}>Go to home</Link>
        </div>
      ) : (
        <div className="log-in">
          <div className="input-areas">
            <form>
              <input
                className="footer-input"
                name="email"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Your Email"
                required
              />
            </form>
            <form>
              <input
                className="footer-input"
                name="password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                required
              />
            </form>
            <div className="log-in-btns">
              <Link>
                <Button
                  className="btns"
                  buttonStyle="btn--outline"
                  buttonSize="btn--large"
                  onClick={login}
                >
                  Log In
                </Button>
              </Link>
            </div>
            <div className="login-status">{loginStatus}</div>
            <div className="sign-up-redirect">
              <Link to="./sign-up" style={{ color: "white" }} onClick={login}>
                Don't have an account? Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
