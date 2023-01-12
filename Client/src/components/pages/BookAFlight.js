import React, { useState } from "react";
import "../../App.css";
import "./BookAFlight.css";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import Footer from "../Footer";
import axios from "axios";

export default function BookAFlight() {
  const [Location01, setLocation01] = useState("");
  const [Location02, setLocation02] = useState("");
  const [FromDate, setFromDate] = useState("");
  const [ToDate, setToDate] = useState("");

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

  const findFlight = () => {
    console.log(
      "From",
      Location01,
      "To",
      Location02,
      "From Date",
      FromDate,
      "To Date",
      ToDate
    );
    axios.get("http://localhost:6969/api/getFlights", {
        params: {
          // From: Location01,
          // To: Location02,
          // From_Date: FromDate,
          // To_Date: ToDate,
          From: "BIA",
          To: "JFK",
          From_Date: "2023-01-01",
          To_Date: "2024-01-01",
        }
      })
      .then((response) => {
        if (response.data.status == "400") {
        } else {
          console.log(response.data[0].flight_ID);
          // window.location.reload();
          
        }
      });
  };

  return (
    <>
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
                    <option value="default">Select</option>
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
                    <option value="default">Select</option>
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
      </div>
      <Footer />
    </>
  );
}
