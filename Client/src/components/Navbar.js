import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTypo3 } from "@fortawesome/free-brands-svg-icons";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
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
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/book-a-flight"
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
                to="/log-in"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Log In
              </Link>
            </li>
            <li>
              <Link
                to="/sign-up"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
          <Link to="/log-in" className="btn-mobile">
            {button && <Button buttonStyle="btn--outline">LOG IN</Button>}
          </Link>
          <Link to="/sign-up" className="btn-mobile">
            {button && <Button buttonStyle="btn--outline">SIGN UP</Button>}
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
