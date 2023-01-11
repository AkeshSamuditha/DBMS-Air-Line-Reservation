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

  const [user, setUser] = useState("");

  // useEffect(() => {
  //   setCount(JSON.parse(window.localStorage.getItem("count")));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("count", count);
  // }, [count]);

  // const increaseCount = () => {
  //   return setCount(count + 1);
  // };

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("user", user);
  }, [user]);

  const refreshPage = () => {
    window.location.reload();
  };

  const login = () => {
    axios
      .post("http://localhost:6969/Auth/login", {
        Email: email,
        Password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "400") {
          setUser(response.data.data.user);
          setLoginStatus("Invalid Username or Passwrod");
        } else {
          handleSubmit();
        }
      });
  };

  const handleSubmit = (e) => {
    refreshPage();
  };

  return (
    <>
      {user !== "" ? (
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
