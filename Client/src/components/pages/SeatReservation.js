import React, { useState } from "react";
import "../../App.css";
import "./SeatReservation.css";
import { Link } from "react-router-dom";
import { Button, Button2 } from "../Button";
import Navbar from "../Navbar";
import { useToken } from "./token";
import axios from "axios";


export default function SeatReservation() {
  const [noOfSeats, setnoOfSeats] = useState(40);
  let seatNumbers = [];
  for (let i = 1; i <= noOfSeats; i++) {
    seatNumbers.push(i);
  }
  const [selectedSeat, setSelectedSeat] = useState(null);

  const [btnState, setBtnState] = useState(false);
  const [token, setToken] = useToken();

  function handleClick() {
    setBtnState((btnState) => !btnState);
  }

  const Bookflight = () => {
    axios
      .post("http://localhost:6969/api/Bookflight", {
        headers: {
          Authorization: token,
        },
        params: {
          Flight_ID: "F1",
          Class: "F",
          Seat_ID: "1",
          // PID: "P1",
          Adult_or_Child: "A",
        },
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  let toggleClass = btnState ? "selected" : "not-selected";

  return (
    <>
      <Navbar />
      <div className="seatReservations">
        <div className="reserve-box">
          <div>
            <div>
              <h2>
                <center>You are almost there! Reserve your seat.</center>
              </h2>
            </div>
            <br />
            <div className="Parent">
              <div className="child1">
                <label>Adults</label>
                <br />
                <select name="adults" className="input-box" id="adults">
                  <option value="default" hidden>
                    Select
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="child2">
                <label>Children</label>
                <br />
                <select name="children" className="input-box" id="children">
                  <option value="default" hidden>
                    Select
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
            <div>
              <label>Class</label>
              <br />
              <select
                id="class"
                className="input-box"
                name="class"
                placeholder="Class"
              >
                <option value="default" hidden>
                  Select
                </option>
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="first-class">Platinum</option>
              </select>
            </div>
            <br />
            <div>
              <h3>Select a desired seat.</h3>
            </div>
            <div className="table_container">
              <div className="table_align">
                (
                <table>
                  <tbody>
                    {seatNumbers.map((seatNumber, index) => {
                      if (index % 10 === 0) {
                        return (
                          <tr key={index}>
                            <td>
                              <Button2
                                className="booking-table"
                                buttonStyle="btn--table"
                                buttonSize="btn--table_size"
                                onClick={() => handleClick(seatNumber)}
                                isSelected={selectedSeat === seatNumber}
                              >
                                {seatNumber}
                              </Button2>
                            </td>
                            {seatNumbers
                              .slice(index + 1, index + 10)
                              .map((seatNumber, subIndex) => {
                                return (
                                  <td key={subIndex}>
                                    <Button2
                                      className="booking-table"
                                      buttonStyle="btn--table"
                                      buttonSize="btn--table_size"
                                      onClick={() => handleClick(seatNumber)}
                                      isSelected={selectedSeat === seatNumber}
                                    >
                                      {seatNumber}
                                    </Button2>
                                  </td>
                                );
                              })}
                          </tr>
                        );
                      }
                      return null;
                    })}
                  </tbody>
                </table>
                ); );
                <>
                  {token ? (
                    <div className="booking-table-btn">
                      <Button
                        className="find-a-flight-btn"
                        buttonStyle="btn--black"
                        buttonSize="btn--black_size"
                        onClick={Bookflight}
                      >
                        Proceed
                      </Button>
                    </div>
                  ) : (
                    <div className="booking-table-btn">
                      <Link to="/guest-user">
                        <Button
                          className="find-a-flight-btn"
                          buttonStyle="btn--black"
                          buttonSize="btn--black_size"
                        >
                          Proceed
                        </Button>
                      </Link>
                    </div>
                  )}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


