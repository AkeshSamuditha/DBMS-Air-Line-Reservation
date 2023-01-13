import React, { useState, useEffect } from "react";
import "../../App.css";
import "./Admin.css";
import "./AdminHome.css";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useToken } from "./token";
import AdminNavbar from "./../AdminNavbar";

export default function AdminHome() {
  const [token, setToken] = useToken();
  const [revenue0, setRevenue0] = useState("");
  const [revenue1, setRevenue1] = useState("");
  const [revenue2, setRevenue2] = useState("");
  const [flightID, setFlightID] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [start_date2, setStartDate2] = useState("");
  const [end_date2, setEndDate2] = useState("");
  const [city, setCity] = useState("");
  const [bookings, setBookings] = useState("");
  const [flightsGot, setFlightsGot] = useState(false);
  const [flightsGot2, setFlightsGot2] = useState(false);
  const [typesGot, setTypesGot] = useState(false);
  const [registered, setRegistered] = useState("");
  const [guest, setGuest] = useState("");
  const [flightTable, setFlightTable] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:6969/admin/api/getrevenueByAircraftType", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => handleRevenue(response))
      .catch((error) => console.log(error));
  }, []);

  function handleRevenue(response) {
    console.log(response);
    console.log(bookings);
    setRevenue0(response.data[0].revenue);
    setRevenue1(response.data[1].revenue);
    setRevenue2(response.data[2].revenue);
  }

  const getPassengersByflight = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:6969/admin/api/getPassengersByFlight", {
        headers: {
          Authorization: token,
        },
        params: {
          Flight_ID: flightID,
        },
      })
      .then((response) => getDetailsByFlight(response))
      .catch((error) => console.log(error));
  };

  function getDetailsByFlight(response) {
    setFlightsGot2(true);
    setFlightTable(response.data);
    console.log(response);
  }

  const bookingsOnADate = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:6969/admin/api/getPassengersByDestination", {
        headers: {
          Authorization: token,
        },
        params: {
          // Destination: "JFK",
          // From_Date: "2023-01-10",
          // To_Date: "2023-07-13",
          Destination_ID: city,
          From_Date: start_date,
          To_Date: end_date,
        },
      })
      .then((response) => getDetailsByDestination(response))
      .catch((error) => console.log(error));
  };

  function getDetailsByDestination(response) {
    console.log(response);
    setBookings(response.data[0].passengers_count);
    setFlightsGot(true);
  }

  const bookingTypesOnADate = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:6969/admin/api/getBookingsByPassengerType", {
        headers: {
          Authorization: token,
        },
        params: {
          // Destination: "JFK",
          // From_Date: "2023-01-10",
          // To_Date: "2023-07-13",
          From_Date: start_date2,
          To_Date: end_date2,
        },
      })
      .then((response) => getDetailsByType(response))
      .catch((error) => console.log(error));
  };

  function getDetailsByType(response) {
    console.log(response);
    setRegistered(response.data[0].Guests);
    setGuest(response.data[0].Registered);
    setTypesGot(true);
  }

  return (
    <>
      {token ? (
        <div>
          <AdminNavbar />
          <div className="container">
            <Link to="/admin-flights">
              <Button
                className="find-a-flight-btn"
                buttonStyle="btn--black"
                buttonSize="btn--black_size"
              >
                Flights
              </Button>
            </Link>
            <Link to="/admin-passengers">
              <Button
                className="find-a-flight-btn"
                buttonStyle="btn--black"
                buttonSize="btn--black_size"
              >
                Passengers
              </Button>
            </Link>
          </div>
          <div className="container">
            <h1>
              Total Revenue = <span>LKR</span>
              <span>
                {(
                  parseInt(revenue0) +
                  parseInt(revenue1) +
                  parseInt(revenue2)
                ).toString()}
              </span>
            </h1>
            <br />
            <div className="grid-container">
              <div className="grid-item">
                <h2>Revenue from Boeing 747</h2>
                <h1>
                  <span>LKR</span> <span>{parseInt(revenue0).toString()}</span>
                </h1>
              </div>
              <div className="grid-item">
                <h2>Revenue from Airbus A350 </h2>
                <h1>
                  <span>LKR</span> <span>{parseInt(revenue1).toString()}</span>
                </h1>
              </div>
              <div className="grid-item">
                <h2>Revenue from Airbus A352</h2>
                <h1>
                  <span>LKR</span> <span>{parseInt(revenue2).toString()}</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="container">
            <h2>Search for Flights</h2>
            <form className="adminForm">
              <label className="adminFormLabel">Flight ID:</label>
              <br />
              <input
                className="adminFormInput"
                type="text"
                id="flight-id"
                name="flight-id"
                placeholder="A12345"
                onChange={(e) => {
                  setFlightID(e.target.value);
                }}
              />
              <br />
              <Button
                className="find-a-flight-btn"
                buttonStyle="btn--black"
                buttonSize="btn--black_size"
                onClick={getPassengersByflight}
              >
                Search
              </Button>
            </form>
            <br />
            <>
              {flightsGot2 ? (
                <div>
                  <>
                    <div>
                      {flightTable.length === 0 ? (
                        <center>NO BOOKINGS FOR FLIGHT {flightID}</center>
                      ) : (
                        <div>
                          <h2>Bookings of Flight {flightID}</h2>
                          <br />
                          <table>
                            <thead>
                              <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Time of Booking</th>
                                <th>Ticket ID</th>
                                <th>Class</th>
                                <th>Seat ID</th>
                                <th>Adult or Child</th>
                                <th>Country</th>
                                <th>Telephone</th>
                              </tr>
                            </thead>
                            <tbody>
                              {flightTable.map((val, key) => {
                                return (
                                  <tr key={key}>
                                    <td>{val.first_name}</td>
                                    <td>{val.last_name}</td>
                                    <td>{val.email}</td>
                                    <td>{val.time_of_booking}</td>
                                    <td>{val.ticket_ID}</td>
                                    <td>{val.class}</td>
                                    <td>{val.seat_ID}</td>
                                    <td>{val.adult_or_child}</td>
                                    <td>{val.country}</td>
                                    <td>{val.telephone}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </>
                </div>
              ) : (
                <div> </div>
              )}
            </>
            <br />
          </div>
          <>
            {flightsGot ? (
              <div>
                <div className="container">
                  <h2>Bookings For a Given Time Period</h2>
                  <br />
                  <form className="adminForm">
                    <label className="adminFormLabel">
                      Start Date:
                      <input
                        className="adminFormInput"
                        type="date"
                        name="start_date"
                        onChange={(e) => {
                          setStartDate(e.target.value);
                        }}
                      />
                    </label>
                    <label className="adminFormLabel">
                      End Date:
                      <input
                        className="adminFormInput"
                        type="date"
                        name="end_date"
                        onChange={(e) => {
                          setEndDate(e.target.value);
                        }}
                      />
                    </label>

                    <label className="adminFormLabel">Select City: </label>

                    <select
                      className="adminFormSelect"
                      name="city"
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    >
                      <option hidden>CITY</option>
                      <option value="DPS">Bali (DPS)</option>
                      <option value="BKK">Bangkok (BKK)</option>
                      <option value="MAA">Chennai (MAA)</option>
                      <option value="BIA">Colombo (BIA)</option>
                      <option value="CGK">Indonesia (CGK)</option>
                      <option value="MRI">Maththala (MRI)</option>
                      <option value="BFK">Minnesota (BFK)</option>
                      <option value="BOM">Mumbai (BOM)</option>
                      <option value="DEL">New Delhi (DEL)</option>
                      <option value="JFK">New York (JFK)</option>
                      <option value="SIN">Singapore (SIN)</option>
                    </select>
                    <Button
                      className="find-a-flight-btn"
                      buttonStyle="btn--black"
                      buttonSize="btn--black_size"
                      onClick={bookingsOnADate}
                    >
                      Submit
                    </Button>
                  </form>
                  <br />
                  <h2>Bookings For the Given Time Period</h2>
                  <br />
                  <h3>{bookings}</h3>
                </div>
              </div>
            ) : (
              <div className="container">
                <h2>Bookings For a Given Time Period</h2>
                <br />
                <form className="adminForm">
                  <label className="adminFormLabel">
                    Start Date:
                    <input
                      className="adminFormInput"
                      type="date"
                      name="start_date"
                      onChange={(e) => {
                        setStartDate(e.target.value);
                      }}
                    />
                  </label>
                  <label className="adminFormLabel">
                    End Date:
                    <input
                      className="adminFormInput"
                      type="date"
                      name="end_date"
                      onChange={(e) => {
                        setEndDate(e.target.value);
                      }}
                    />
                  </label>

                  <label className="adminFormLabel">Select City: </label>

                  <select
                    className="adminFormSelect"
                    name="city"
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  >
                    <option hidden>CITY</option>
                    <option value="DPS">Bali (DPS)</option>
                    <option value="BKK">Bangkok (BKK)</option>
                    <option value="MAA">Chennai (MAA)</option>
                    <option value="BIA">Colombo (BIA)</option>
                    <option value="CGK">Indonesia (CGK)</option>
                    <option value="MRI">Maththala (MRI)</option>
                    <option value="BFK">Minnesota (BFK)</option>
                    <option value="BOM">Mumbai (BOM)</option>
                    <option value="DEL">New Delhi (DEL)</option>
                    <option value="JFK">New York (JFK)</option>
                    <option value="SIN">Singapore (SIN)</option>
                  </select>
                  <Button
                    className="find-a-flight-btn"
                    buttonStyle="btn--black"
                    buttonSize="btn--black_size"
                    onClick={bookingsOnADate}
                  >
                    Submit
                  </Button>
                </form>
              </div>
            )}
          </>

          <div className="container">
            <h2>Booking Types Within a Period</h2>
            <br />
            <form className="adminForm" action="">
              <label className="adminFormLabel">
                Start Date:
                <input
                  className="adminFormInput"
                  type="date"
                  name="start_date"
                  onChange={(e) => {
                    setStartDate2(e.target.value);
                  }}
                />
              </label>
              <label className="adminFormLabel">
                End Date:
                <input
                  className="adminFormInput"
                  type="date"
                  name="end_date"
                  onChange={(e) => {
                    setStartDate2(e.target.value);
                  }}
                />
              </label>

              <Button
                className="find-a-flight-btn"
                buttonStyle="btn--black"
                buttonSize="btn--black_size"
                onClick={bookingTypesOnADate}
              >
                Submit
              </Button>
              <br />
              <>
                <div className="space"></div>
                {typesGot ? (
                  <table>
                    <tbody>
                      <tr>
                        <th>Type</th>
                        <th>Count</th>
                      </tr>
                      <tr>
                        <td>Registered</td>
                        <td>{registered}</td>
                      </tr>
                      <tr>
                        <td>Guest</td>
                        <td>{guest}</td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <table>
                    <tbody>
                      <tr>
                        <th>Type</th>
                        <th>Count</th>
                      </tr>
                      <tr>
                        <td>Registered</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>Guest</td>
                        <td>-</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </>
            </form>
          </div>

          {/* <div className="container">
            <h2>Add a Flight</h2>
            <form className="adminForm">
              <label className="adminFormLabel">Flight ID:</label>
              <br />
              <input
                className="adminFormInput"
                type="text"
                id="flight-number"
                name="flight-number"
                placeholder="A12345"
              />
              <br />
              <label>Departure City:</label>
              <br />
              <input
                className="adminFormInput"
                type="text"
                id="departure-city"
                name="departure-city"
                placeholder="City A"
              />
              <br />
              <label>Arrival City:</label>
              <br />
              <input
                className="adminFormInput"
                type="text"
                id="arrival-city"
                name="arrival-city"
                placeholder="City B"
              />
              <br />
              <label className="adminFormLabel">Departure Time:</label>
              <br />
              <input
                className="adminFormInput"
                type="time"
                id="appt"
                name="appt"
              />
              <br />
              <label className="adminFormLabel">Arrival Time:</label>
              <br />
              <input
                className="adminFormInput"
                type="time"
                id="arrival-time"
                name="arrival-time"
              />
              <br />
              <Button
                className="find-a-flight-btn"
                buttonStyle="btn--black"
                buttonSize="btn--black_size"
              >
                Add Flight
              </Button>
            </form>
          </div> */}
        </div>
      ) : (
        <div className="container">
          <h1>පලයන් යන්න</h1>
        </div>
      )}
    </>
  );
}