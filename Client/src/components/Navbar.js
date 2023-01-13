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
      .delete("http://localhost:6969/API/registered/logout", {
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

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      {token ? (
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
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/api/BookFlight"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Book A Flight
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/destinations"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Destinations
                </Link>
              </li>
              <div className="userbtn">
                <Button className="nav-item" onClick={handleOpen}>
                  <FontAwesomeIcon icon={faUser} />
                </Button>
                {open ? (
                  <ul className="menu">
                    <li className="menu-item">
                      <Link to="/Auth/UserProfile" className="btn-mobile">
                        <Button
                          buttonStyle="btn--dropdown"
                          buttonSize="btn--dropdown_size"
                        >
                          Your Profile
                        </Button>
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Button
                        buttonStyle="btn--dropdown"
                        buttonSize="btn--dropdown_size"
                        onClick={logout}
                      >
                        Log Out
                      </Button>
                    </li>
                  </ul>
                ) : null}
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
      ) : (
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
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/api/BookFlight"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Book A Flight
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/destinations"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  to="/Auth/login"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  to="/Auth/Register"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
            <Link to="/Auth/login" className="btn-mobile">
              {button && <Button buttonStyle="btn--outline">LOG IN</Button>}
            </Link>
            <Link to="/Auth/Register" className="btn-mobile">
              {button && <Button buttonStyle="btn--outline">SIGN UP</Button>}
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
