import React from "react";
import "../../App.css";
import "./BookAFlight.css";
import { Link } from "react-router-dom";
import { Button } from "../Button";

export default function BookAFlight() {
  return (
    <div className="book-your-flight">
      <div>
        <h1 className="book-a-flight">Book A Flight</h1>
      </div>
      <div className="booking-bg">
        <div className="booking-input">
          <h2>
            <center>Book your Flight!</center>
          </h2>
          <br />
          <form>
            <div className="Parent">
              <div className="child1">
                <label for="from">From</label>
                <br />
                <select name="from" className="input-box" id="from">
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
                <label for="to">To</label>
                <br />
                <select name="to" className="input-box" id="to">
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
                <label for="depart">From Date</label>
                <br />
                <input
                  type="date"
                  className="input-box"
                  id="depart"
                  name="depart"
                  placeholder="Depart"
                />
              </div>
              <div className="child2">
                <label for="return">To Date</label>
                <br />
                <input
                  type="date"
                  className="input-box"
                  id="return"
                  name="return"
                  placeholder="Return"
                />
              </div>
            </div>
            <div className="find-a-flight-btn">
              <Link>
                <Button
                  className="find-a-flight-btn"
                  buttonStyle="btn--black"
                  buttonSize="btn--black_size"
                >
                  Find a Flight
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
