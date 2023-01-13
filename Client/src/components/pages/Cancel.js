import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import "../../components/HeroSection.css";
import { Button } from "../Button";
import { useToken } from "./token";
import Navbar from "../Navbar";

function Cancel() {
  const [token, setToken] = useToken();
  const [ticket_ID, setTicket_ID] = useState("");

  function cancelBooking() {
    axios
      .post("http://localhost:6969/api/registered/CancelBooking", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Navbar />
      <div className="hero-container">
        <h1>Are You Sure You Want to Cancel?</h1>
        <div className="hero-btns">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
            onClick={cancelBooking}
          >
            Yes
          </Button>
          <Link to="/Auth/UserProfile">
            <Button
              className="btns"
              buttonStyle="btn--outline"
              buttonSize="btn--large"
            >
              No
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Cancel;
