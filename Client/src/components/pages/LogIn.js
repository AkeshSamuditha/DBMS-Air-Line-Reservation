import React, { useState, useEffect } from "react";
import "../../App.css";
import "./LogIn.css";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import "./../Button.css";
import axios from "axios";

function useToken() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return [token, setToken];
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const [token, setToken] = useToken();

  useEffect(() => {
    console.log("Before", token);
    if (token !== localStorage.getItem("token")) {
      localStorage.setItem("token", token);
      console.log(token);
      console.log("shit");
    }
  }, [token]);

  const login = () => {
    axios
      .post("http://localhost:6969/Auth/login", {
        Email: email,
        Password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "400") {
          setLoginStatus("Invalid Username or Passwrod");
        } else {
          console.log(response.data.data.token);
          handleLogin(response);
          window.location.reload();
        }
      });
  };

  function handleLogin(response) {
    setToken(response.data.data.token);
    console.log(token);
  }

  return (
    <>
      {token ? (
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
      ) : (
        <div className="log-in">
          console.log(user);
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
              <Link to="./Auth/Register" style={{ color: "white" }}>
                Don't have an account? Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
