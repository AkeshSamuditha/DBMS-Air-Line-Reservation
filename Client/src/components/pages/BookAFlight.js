import React, { useState } from "react";
import "../../App.css";
import "./BookAFlight.css";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import Navbar from "../Navbar";
import axios from "axios";

export default function BookAFlight() {
  const [Location01, setLocation01] = useState("");
  const [Location02, setLocation02] = useState("");
  const [FromDate, setFromDate] = useState("");
  const [ToDate, setToDate] = useState("");
  const [flightsGot, setFlightsGot] = useState(false);
  const [flightTable, setFlightTable] = useState([]); 

  const [selected, setSelect] = useState("");

  const disableDates = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return yyyy + "-" + mm + "-" + dd;
  };

  const findFlight = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:6969/api/getFlights", {
        params: {
          From: Location01,
          To: Location02,
          From_Date: FromDate,
          To_Date: ToDate,
          // From: "BIA",
          // To: "JFK",
          // From_Date: "2023-01-01",
          // To_Date: "2024-01-02",
        },
      })
      .then((response) => handleFlightDetails(response))
      .catch((error) => {
        window.location.reload();
        console.log("Details of flight not found");
      });
  };

  function handleFlightDetails(response) {
    setFlightsGot(true);
    setFlightTable(response.data);
  }

  return (
    <>
      <Navbar />
      <div className="book-your-flight">
        <div>
          <h1 className="book-a-flight">Book A Flight</h1>
        </div>
        <div className="booking-bg">
          <div className="booking-input">
            <h2>
              <center>Book your Flight!</center>
            </h2>
            {disableDates()}
            <br />
            <form>
              <div className="Parent">
                <div className="child1">
                  <label>From</label>
                  <br />
                  <select
                    name="from"
                    className="input-box"
                    id="from"
                    onChange={(e) => {
                      setLocation01(e.target.value);
                    }}
                  >
                    <option value="default" hidden={true}>
                      Select
                    </option>
                    <option value="DPS">Bali (DPS)</option>
                    <option value="BKK">Bangkok (BKK)</option>
                    <option value="MAA">Chennai (MAA)</option>
                    <option value="BIA">Colombo (BIA)</option>
                    <option value="CGK">Indonesia (CGK)</option>
                    <option value="HRI">Maththala (MRI)</option>
                    <option value="BFK">Minnesota (BFK)</option>
                    <option value="BOM">Mumbai (BOM)</option>
                    <option value="DEL">New Delhi (DEL)</option>
                    <option value="JFK">New York (JFK)</option>
                    <option value="SIN">Singapore (SIN)</option>
                  </select>
                </div>

                <div className="child2">
                  <label>To</label>
                  <br />
                  <select
                    name="to"
                    className="input-box"
                    id="to"
                    onChange={(e) => {
                      setLocation02(e.target.value);
                    }}
                  >
                    <option value="default" hidden={true}>
                      Select
                    </option>
                    <option value="DPS">Bali (DPS)</option>
                    <option value="BKK">Bangkok (BKK)</option>
                    <option value="MAA">Chennai (MAA)</option>
                    <option value="BIA">Colombo (BIA)</option>
                    <option value="CGK">Indonesia (CGK)</option>
                    <option value="HRI">Maththala (MRI)</option>
                    <option value="BFK">Minnesota (BFK)</option>
                    <option value="BOM">Mumbai (BOM)</option>
                    <option value="DEL">New Delhi (DEL)</option>
                    <option value="JFK">New York (JFK)</option>
                    <option value="SIN">Singapore (SIN)</option>
                  </select>
                </div>
              </div>
              <div className="Parent">
                <div className="child1">
                  <label>From Date</label>
                  <br />
                  <input
                    type="date"
                    className="input-box"
                    id="depart"
                    name="depart"
                    placeholder="Depart"
                    min={disableDates()}
                    onChange={(e) => {
                      setSelect(e.target.value);
                      setFromDate(e.target.value);
                    }}
                  />
                </div>
                <div className="child2">
                  <label>To Date</label>
                  <br />
                  <input
                    type="date"
                    className="input-box"
                    id="return"
                    name="return"
                    placeholder="Return"
                    min={selected}
                    onChange={(e) => {
                      setToDate(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="find-a-flight-btn">
                <Button
                  className="find-a-flight-btn"
                  buttonStyle="btn--black"
                  buttonSize="btn--black_size"
                  onClick={findFlight}
                >
                  Find a Flight
                </Button>
              </div>
            </form>
          </div>
        </div>
        <>
          {flightsGot ? (
            <div>
              <>
                <div>
                  {flightTable.length === 0 ? (
                    <div>NO FLIGHTS AVAILABLE FOR YOU SELECTION, TRY AGAIN</div>
                  ) : (
                    <div>
                      <h2>
                        Flights from {Location01} to {Location02} between{" "}
                        {FromDate} to {ToDate}
                      </h2>
                      <table>
                        <thead>
                          <tr>
                            <th>Flight ID</th>
                            <th>Date of Travel</th>
                            <th>Departure Time</th>
                            <th>Arrival Time</th>
                            <th>Tickets Remaining : Platinum</th>
                            <th>Tickets Remaining : Buisness</th>
                            <th>Tickets Remaining : Economy</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {flightTable.map((val, key) => {
                          return (
                            <tr key={key}>
                              <td>{val.flight_ID}</td>
                              <td>{val.date_of_travel}</td>
                              <td>{val.dep_time}</td>
                              <td>{val.Arr_time}</td>
                              <td>{val.Tickets_remainingP}</td>
                              <td>{val.Tickets_remainingB}</td>
                              <td>{val.Tickets_remainingE}</td>
                              <td>
                                <Link to="/seatReservations">
                                  <button className="edit-button">
                                    Book Ticekt
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                        </tbody>
                      </table>
                      <h5>*ටිකට් වල ගණන් ඕනිනම් බුක් කරන්න පලයන්</h5>
                    </div>
                  )}
                </div>
              </>
            </div>
          ) : (
            <div> </div>
          )}
        </>
      </div>
    </>
  );
}