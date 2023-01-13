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

  const [selected, setSelect] = useState("");
  const [flights0, setFlights0] = useState([]);
  const [flights1, setFlights1] = useState([]);
  const [flights2, setFlights2] = useState([]);

  const flight0Values = Object.values(flights0);
  const flight1Values = Object.values(flights1);
  const flight2Values = Object.values(flights2);

  const header = [
    "Flight ID",
    "Date of Travel",
    "Arrival Time",
    "Departure Time",
    "Tickets Remaining :First Class",
    "Tickets Remaining :Bussiness Class",
    "Tickets Remaining :Economic Class",
    "Flight Status",
  ];

  const fullArray = [header, flight0Values, flight1Values, flight2Values];

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
          // From: Location01,
          // To: Location02,
          // From_Date: FromDate,
          // To_Date: ToDate,
          From: "BIA",
          To: "JFK",
          From_Date: "2023-01-01",
          To_Date: "2024-01-01",
        },
      })
      .then((response) => {
        if (response.data.status == "400") {
        } else {
          console.log(response.data[0]);
          handleFlightDetails(response);
          // window.location.reload();
        }
      });
  };

  function handleFlightDetails(response) {
    setFlightsGot(true);
    setFlights0(response.data[0]);
    setFlights1(response.data[1]);
    setFlights2(response.data[2]);
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
              <table>
                <thead>
                  <tr>
                    {fullArray[0].map((item, index) => {
                      return <th key={index}>{item}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {fullArray.slice(1, fullArray.length).map((item, index) => {
                    return (
                      <tr key={index}>
                        <td key={item[0]}>{item[0]}</td>
                        <td key={item[1]}>{item[1]}</td>
                        <td key={item[2]}>{item[2]}</td>
                        <td key={item[3]}>{item[3]}</td>
                        <td key={item[4]}>{item[4]}</td>
                        <td key={item[5]}>{item[5]}</td>
                        <td key={item[6]}>{item[6]}</td>
                        <td key={item[7]}>{item[7]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div></div>
          )}
        </>
      </div>
    </>
  );
}