import React, { useState, useEffect } from "react";
import "../../App.css";
import "./SeatReservation.css";
import { Link } from "react-router-dom";
import { Button, Button2 } from "../Button";
import Navbar from "../Navbar";
import { useToken } from "./token";
import axios from "axios";

export default function SeatReservation() {
  const [noOfSeats, setnoOfSeats] = useState(40);
  const [price, setPrice] = useState();
  const [classes, setClasses] = useState("");
  const [selected, setSelected] = useState(false);
  const [temp, setTemp] = useState("");

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

  const getPrice = () => {
    if (classes === "F") {
    }
    axios
      .get("http://localhost:6969/Api/SeatPrice", {
        headers: {
          Authorization: token,
        },
        params: {
          Flight_ID: "F1",
          Class: classes,
        },
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const Bookflight = () => {
    axios
      .post(
        "http://localhost:6969/api/Bookflight",
        {
          Flight_ID: "F1",
          Class: "F",
          Seat_ID: "1",
          Adult_or_Child: "A",
        },
        // Country: "Mr",
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setClasses(temp);
  }, [temp]);

  useEffect(() => {
    getPrice();
  }, [classes]);

  function handleChange(e) {
    setTemp(e.target.value);
  }

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
                <label>Type</label>
                <br />
                <select name="adults" className="input-box" id="adults">
                  <option value="default" hidden>
                    Select
                  </option>
                  <option value="1" hidden>
                    Type
                  </option>
                  <option value="2">Adult</option>
                  <option value="3">Child</option>
                </select>
              </div>
              <div className="child2">
                <label>Class</label>
                <br />
                <select
                  id="class"
                  className="input-box"
                  name="class"
                  placeholder="Class"
                  onChange={(e) => {
                    handleChange(e);
                    setSelected(true);
                  }}
                >
                  <option hidden>Select</option>
                  <option value="E">Economy</option>
                  <option value="B">Business</option>
                  <option value="P">Platinum</option>
                </select>
              </div>
            </div>
            <>
              <div>
                {selected ? (
                  <div>
                    <br />
                    <center>Price per Ticket = LKR {price} /=</center>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </>
            <br />
            <div>
              <h3>Select a Desired Seat</h3>
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
