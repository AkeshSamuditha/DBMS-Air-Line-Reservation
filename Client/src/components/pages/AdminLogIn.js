import React, { useState, useEffect } from "react";
import "../../App.css";
import "./LogIn.css";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import "./../Button.css";
import axios from "axios";
import { useToken } from './token';
import Navbar from "./../Navbar";

export default function AdminLogIn() {
  const [token, setToken] = useToken();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const adminlogin = () => {
    axios
      .post("http://localhost:6969/admin/login", {
        Admin_Name: name,
        Admin_Password: password,

      })
      .then((response) => {
        handleLogin(response);
      })
      .catch((error) => {
        setLoginStatus("Invalid Username or Password");
      });
  };

  function handleLogin(response) {
    const { token } = response.data;
    if (token) {
      setToken(token);
      window.location.href = "/admin-home";
    }
  }

  return (
    <>
      <Navbar />
      <div className="admin-login">
        <div className="input-areas-login">
          <form>
            <input
              className="footer-input"
              name="name"
              type="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
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
            {/* <Link to="/admin-home"> */}
            <Link to="/admin-login">
              <Button
                className="btns"
                buttonStyle="btn--outline"
                buttonSize="btn--large"
                onClick={adminlogin}
              >
                Log In
              </Button>
            </Link>
          </div>
          <div className="login-status">{loginStatus}</div>
        </div>
      </div>
    </>
  );
}
