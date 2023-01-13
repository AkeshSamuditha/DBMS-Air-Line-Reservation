import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTypo3 } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useToken } from "./pages/token";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [logoutStatus, setLogoutStatus] = useState("");

  const [token, setToken] = useToken();

  const logout = () => {
    axios
      .delete("http://localhost:6969/admin/api/logout", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.message == "400") {
          setLogoutStatus("Error While Logging Out");
        } else {
          setToken("");
          localStorage.removeItem("token");
          console.log(token);
          window.location.replace("http://localhost:3000");
          setLogoutStatus("Logged Out");
        }
      });
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const inlinefunction = () => {
    closeMobileMenu();
    logout();
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            B Airways
            <FontAwesomeIcon icon={faTypo3} />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <div>
              <li className="nav-links">
                <Button
                  buttonStyle="btn--dropdown"
                  buttonSize="btn--dropdown_size"
                  onClick={logout}
                >
                  Log Out
                </Button>
              </li>
            </div>
            <li>
              <Link
                to="/Auth/login"
                className="nav-links-mobile"
                onClick={inlinefunction}
              >
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
