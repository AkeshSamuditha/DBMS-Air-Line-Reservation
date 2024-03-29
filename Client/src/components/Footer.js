import React, { useState, useEffect } from "react";
import "./Footer.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { useToken } from "./pages/token";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
  faLinkedin,
  faTypo3,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const [token, setToken] = useToken();

  return (
    <>
      {token ? (
        <div className="footer-container">
          <section className="footer-subscription">
            <p className="footer-subscription-heading">
              Join B Airways By Registering and Enjoy Exclusive Deals
            </p>
          </section>
          {/* <div className="footer-links">
            <div className="footer-link-wrapper">
              <div className="footer-link-items">
                <h2>About Us</h2>
                <Link to="/sign-up">How it works</Link>
                <Link to="/">Testimonials</Link>
                <Link to="/">Investors</Link>
                <Link to="/">Terms of Service</Link>
              </div>
              <div className="footer-link-items">
                <h2>Contact Us</h2>
                <Link to="/">Contact</Link>
                <Link to="/">Support</Link>
                <Link to="/">Destinations</Link>
                <Link to="/">Sponsorships</Link>
              </div>
            </div>
            <div className="footer-link-wrapper">
              <div className="footer-link-items">
                <h2>Videos</h2>
                <Link to="/">Submit Video</Link>
                <Link to="/">Agency</Link>
                <Link to="/">Influencer</Link>
              </div>
            </div>
          </div>
          <div></div> */}
          <div>
            <Link to="/deals">
              <Button
                className="find-a-flight-btn"
                buttonStyle="btn--black"
                buttonSize="btn--black_size"
              >
                View Deals !
              </Button>
            </Link>
          </div>
          <section className="social-media">
            <div className="social-media-wrap">
              <div className="footer-logo">
                <Link to="/" className="social-logo">
                  B Airways
                  <FontAwesomeIcon icon={faTypo3} />
                </Link>
              </div>
              <div className="footer-link-items">
                <h2>About Us</h2>
              </div>
              <small className="website-rights">G20 © 2023</small>
              <div className="social-icons">
                <Link
                  className="social-icon-link facebook"
                  to="/"
                  target="_blank"
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </Link>
                <Link
                  className="social-icon-link instagram"
                  to="/"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link
                  className="social-icon-link youtube"
                  to="/"
                  target="_blank"
                  aria-label="Youtube"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </Link>
                <Link
                  className="social-icon-link twitter"
                  to="/"
                  target="_blank"
                  aria-label="Twitter"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </Link>
                <Link
                  className="social-icon-link twitter"
                  to="/"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="footer-container">
          <section className="footer-subscription">
            <p className="footer-subscription-heading">
              Join B Airways by registering and enjoy exclusive deals
            </p>
          </section>
          {/* <div className="footer-links">
            <div className="footer-link-wrapper">
              <div className="footer-link-items">
                <h2>About Us</h2>
                <Link to="/sign-up">How it works</Link>
                <Link to="/">Testimonials</Link>
                <Link to="/">Investors</Link>
                <Link to="/">Terms of Service</Link>
              </div>
              <div className="footer-link-items">
                <h2>Contact Us</h2>
                <Link to="/">Contact</Link>
                <Link to="/">Support</Link>
                <Link to="/">Destinations</Link>
                <Link to="/">Sponsorships</Link>
              </div>
            </div>
            <div className="footer-link-wrapper">
              <div className="footer-link-items">
                <h2>Videos</h2>
                <Link to="/">Submit Video</Link>
                <Link to="/">Agency</Link>
                <Link to="/">Influencer</Link>
              </div>
            </div>
          </div> */}
          <div>
            <Link to="/admin-login">
              <Button
                className="find-a-flight-btn"
                buttonStyle="btn--black"
                buttonSize="btn--black_size"
              >
                Admin Portal
              </Button>
            </Link>
          </div>
          <section className="social-media">
            <div className="social-media-wrap">
              <div className="footer-logo">
                <Link to="/" className="social-logo">
                  B Airways
                  <FontAwesomeIcon icon={faTypo3} />
                </Link>
              </div>
              <div className="footer-link-items">
                <h2>About Us</h2>
              </div>
              <small className="website-rights">G20 © 2023</small>
              <div className="social-icons">
                <Link
                  className="social-icon-link facebook"
                  to="/"
                  target="_blank"
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </Link>
                <Link
                  className="social-icon-link instagram"
                  to="/"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link
                  className="social-icon-link youtube"
                  to="/"
                  target="_blank"
                  aria-label="Youtube"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </Link>
                <Link
                  className="social-icon-link twitter"
                  to="/"
                  target="_blank"
                  aria-label="Twitter"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </Link>
                <Link
                  className="social-icon-link twitter"
                  to="/"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Footer;
