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
  const [revenue0, setRevenue0] = useState([]);
  const [revenue1, setRevenue1] = useState([]);
  const [revenue2, setRevenue2] = useState([]);
  const [flightID, setFlightID] = useState([""]);

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
    setRevenue0(response.data);
    // setRevenue1(response.data[1]);
    // setRevenue2(response.data[2]);

    console.log(response.data[0]);
    console.log(response.data[1]);
    console.log(response.data[2]);
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
              Total Revenue = <span>LKR</span> {/* <span></span> */}
            </h1>
            <br />
            <div className="grid-container">
              <div className="grid-item">
                <h2>Revenue from Boeing 747</h2>
                <h1>
                  <span>LKR</span>{" "}
                  <span>
                    {/* {revenue0.map((item) => (
                      <div key={item.model_ID}>
                        <h2>
                          {item.model} {item.brand}
                        </h2>
                        <h1>
                          Revenue: LKR <span>{item.revenue}</span>
                        </h1>
                      </div>
                    ))} */}
                  </span>
                </h1>
              </div>
              <div className="grid-item">
                <h2>Revenue from Airbus A350 </h2>
                <h1>
                  <span>LKR</span>{" "}
                  <span>
                    {/* {revenue1.map((item) => (
                      <div key={revenue1.model_ID}>
                        <h2>
                          {revenue1.model} {revenue1.brand}
                        </h2>
                        <h1>
                          Revenue: LKR <span>{revenue1.revenue}</span>
                        </h1>
                      </div>
                    ))} */}
                  </span>
                </h1>
              </div>
              <div className="grid-item">
                <h2>Revenue from Airbus A352</h2>
                <h1>
                  <span>LKR</span>{" "}
                  <span>
                    {/* {revenue2.map((item) => (
                      <div key={revenue2.model_ID}>
                        <h2>
                          {revenue2.model} {revenue2.brand}
                        </h2>
                        <h1>
                          Revenue: LKR <span>{revenue2.revenue}</span>
                        </h1>
                      </div>
                    ))} */}
                  </span>
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
          <div className="container">
            <h2>Bookings on a date</h2>
            <br />
            <form className="adminForm">
              <label className="adminFormLabel">
                Start Date:{" "}
                <input
                  className="adminFormInput"
                  type="date"
                  name="start_date"
                />
              </label>
              <label className="adminFormLabel">
                End Date:{" "}
                <input className="adminFormInput" type="date" name="end_date" />
              </label>

              <label className="adminFormLabel">Select City: </label>

              <select className="adminFormSelect" name="city">
                <option hidden>CITY</option>
                <option value="BIA">Colombo (BIA)</option>
                <option value="HRI">Maththala (MRI)</option>
                <option value="BFK">Minnesota (BFK)</option>
                <option value="DEL">New Delhi (DEL)</option>
                <option value="BOM">Mumbai (BOM)</option>
                <option value="MAA">Chennai (MAA)</option>
                <option value="BKK">Bangkok (BKK)</option>
                <option value="SIN">Singapore (SIN)</option>
                <option value="CGK">Indonesia (CGK)</option>
                <option value="DPS">Bali (DPS)</option>
                <option value="JFK">New York (JFK)</option>
              </select>
              <Button
                className="find-a-flight-btn"
                buttonStyle="btn--black"
                buttonSize="btn--black_size"
              >
                Submit
              </Button>
            </form>
          </div>
          <div className="container">
            <h2>Booking types within a period</h2>
            <br />
            <form className="adminForm" action="">
              <label className="adminFormLabel">
                Start Date:{" "}
                <input
                  className="adminFormInput"
                  type="date"
                  name="start_date"
                />
              </label>
              <label className="adminFormLabel">
                End Date:{" "}
                <input className="adminFormInput" type="date" name="end_date" />
              </label>

              <Button
                className="find-a-flight-btn"
                buttonStyle="btn--black"
                buttonSize="btn--black_size"
              >
                Submit
              </Button>
              <br />
              <div className="space"></div>
              <table>
                <tbody>
                  <tr>
                    <th>Type</th>
                    <th>Count</th>
                  </tr>
                  <tr>
                    <td>Registered</td>
                    <td>00</td>
                  </tr>
                  <tr>
                    <td>Guest</td>
                    <td>00</td>
                  </tr>
                </tbody>
              </table>
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
