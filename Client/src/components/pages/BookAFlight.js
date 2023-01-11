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
      <div className="booking-input" id="booking-redirect">
        <h2>
          <center>Book your Flight!</center>
        </h2>
        <br />
        <form>
          <div className="Parent">
            <div className="child1">
              <label>From</label>
              <br />
              <select name="from" className="input-box" id="from">
                <option>Select</option>
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
              <select name="to" className="input-box" id="to">
                <option>Select</option>
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
              <label>From</label>
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
              <label>To</label>
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
          <div className="Parent">
            <div className="child1">
              <label>Adults</label>
              <br />
              <select name="adults" className="input-box" id="adults">
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
              <option value="economy">Economy</option>
              <option value="business">Business</option>
              <option value="first-class">Platinum</option>
            </select>
          </div>
          <div className="find-a-flight-btn">
            <Link>
              <Button
                className="find-a-flight-btn"
                buttonStyle="btn--outline"
                buttonSize="btn--large"
              >
                Find a Flight
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
