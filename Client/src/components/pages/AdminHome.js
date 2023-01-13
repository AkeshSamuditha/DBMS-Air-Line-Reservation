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
  const [typesGot, setTypesGot] = useState(false);
  const [registered, setRegistered] = useState("");
  const [guest, setGuest] = useState("");

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

  const getPassengersByflight = () => {
    axios
      .get("http://localhost:6969/admin/api/getPassengersByFlight", {
        params: {
          Flight_ID: "F1",
        },
      })
      .then((response) => getDetailsByFlight(response))
      .catch((error) => console.log(error));
  };

  function getDetailsByFlight(response) {
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
      .then((response) => getDetailsByType(response))
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

            <h2>Bookings of Flight A12345</h2>
            <br />
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Flight</th>
                  <th>Actions</th>
                </tr>
                <tr>
                  <td>John Doe</td>
                  <td>johndoe@example.com</td>
                  <td>2000-01-01</td>
                  <td>A12345</td>
                  <td>
                    <button className="edit-button">Edit</button>
                    <button className="delete-button">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
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
                      <option value="HRI">Maththala (MRI)</option>
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
                    <option value="HRI">Maththala (MRI)</option>
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

          <div className="container">
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
          </div>
        </div>
      ) : (
        <div className="container">
          <h1>පලයන් යන්න</h1>
        </div>
      )}
    </>
  );
}
