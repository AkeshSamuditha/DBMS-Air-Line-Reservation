import React, { useState, useEffect } from "react";
import "../../App.css";
import "./LogIn.css";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import "./../Button.css";
import axios from "axios";
import { useToken } from "./token";
import Navbar from "../Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [token, setToken] = useToken();

  const login = () => {
    axios
      .post("http://localhost:6969/Auth/login", {
        Email: email,
        Password: password,
      })
      .then((response) => handleLogin(response))
      .catch((error) => setLoginStatus("Invalid Username or Passwrod"));
  };

  function handleLogin(response) {
    const { token } = response.data;
    if (token) {
      setToken(token);
    }
    window.location.reload();
  }

  return (
    <>
      <Navbar />
      {token ? (
        <>
          <div className="logged-in">
            <div className="logged-in-container">
              <div className="heading">
                <h1>You are logged in</h1>
              </div>
              <br />
              <div className="back-link">
                <Link to={"/"}>Go to home</Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="log-in">
            <div className="input-areas-login">
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
                <Link to="/Auth/login" target={"_self"}>
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
                <Link to="./Register" style={{ color: "white" }}>
                  Don't have an account? Sign Up
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
