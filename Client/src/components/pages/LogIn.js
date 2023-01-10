import React, { useState, useEffect } from "react";
import "../../App.css";
import "./LogIn.css";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import "./../Button.css";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(JSON.parse(window.localStorage.getItem("count")));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("count", count);
  }, [count]);

  const increaseCount = () => {
    return setCount(count + 1);
  };

  const refreshPage = () => {
    window.location.reload();
  };

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

  const handleSubmit = (e) => {
    increaseCount();
    refreshPage();
  };

  return (
    <>
      {count > 0 ? (
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
              <Link target={"_self"}>
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
              <Link to="./sign-up" style={{ color: "white" }}>
                Don't have an account? Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
