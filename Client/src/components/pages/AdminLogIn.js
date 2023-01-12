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

export default function AdminLogIn() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const [token, setToken] = useToken();

  useEffect(() => {
    console.log(token);
    if (token !== localStorage.getItem("token")) {
      localStorage.setItem("token", token);
      console.log(token);
    }
  }, [token]);

  //   const login = () => {
  //     axios
  //       .post("http://localhost:6969/Auth/login", {
  //         Name: name,
  //         Password: password,
  //       })
  //       .then((response) => {
  //         console.log("shit", response);
  //         if (response.data.status == "400") {
  //           setLoginStatus("Invalid Passwrod");
  //         } else {
  //           console.log(response);
  //           handleLogin(response);
  //           window.location.reload();
  //         }
  //       });
  //   };

  function handleLogin(response) {
    setToken(response.data.data.token);
    console.log("ent", token);
  }

  return (
    <div className="log-in">
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
          <Link to="/admin-home">
            {/* <Link to="/Auth/login"> */}
            <Button
              className="btns"
              buttonStyle="btn--outline"
              buttonSize="btn--large"
              //   onClick={login}
            >
              Log In
            </Button>
          </Link>
        </div>
        <div className="login-status">{loginStatus}</div>
      </div>
    </div>
  );
}
