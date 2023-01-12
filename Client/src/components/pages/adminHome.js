import React from "react";
import "../../App.css";
import "./admin.css";
import "./adminHome.css";
import { Button } from "../Button";

export default function adminPassengers() {
  return (
    <div>
      <div class="container">
        <h1>
          Total Revenue = <span>LKR</span> <span>1200</span> <span>.99</span>
        </h1>
        <br />
        <div class="grid-container">
          <div class="grid-item">
            <h2>Revenue from Boeing 747</h2>
            <h1>
              <span>LKR</span> <span>1200</span> <span>.99</span>
            </h1>
          </div>
          <div class="grid-item">
            <h2>Revenue from Airbus A350 </h2>
            <h1>
              <span>LKR</span> <span>1200</span> <span>.99</span>
            </h1>
          </div>
          <div class="grid-item">
            <h2>Revenue from Airbus A352</h2>
            <h1>
              <span>LKR</span> <span>1200</span> <span>.99</span>
            </h1>
          </div>
        </div>
      </div>
      <div class="container">
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
        <table id="bookings-table">
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
              <button class="edit-button">Edit</button>
              <button class="delete-button">Delete</button>
            </td>
          </tr>
        </table>
        <br />
      </div>
      <div class="container">
        <h2>Bookings on a date</h2>
        <br />
        <form className="adminForm">
          <label className="adminFormLabel">
            Start Date:{" "}
            <input className="adminFormInput" type="date" name="start_date" />
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
      <div class="container">
        <h2>Booking types within a period</h2>
        <br />
        <form className="adminForm" action="">
          <label className="adminFormLabel">
            Start Date:{" "}
            <input className="adminFormInput" type="date" name="start_date" />
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
          </table>
        </form>
      </div>

      <div class="container">
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
          <label for="departure-city">Departure City:</label>
          <br />
          <input
            className="adminFormInput"
            type="text"
            id="departure-city"
            name="departure-city"
            placeholder="City A"
          />
          <br />
          <label for="arrival-city">Arrival City:</label>
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
          <input className="adminFormInput" type="time" id="appt" name="appt" />
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
  );
}
