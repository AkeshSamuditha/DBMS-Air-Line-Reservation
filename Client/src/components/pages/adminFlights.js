import React from "react";
import "../../App.css";

export default function adminFlights() {
  return (
    <div>
      <div className="container">
        <h1 className="topic">Booked Flights</h1>
        <br />
        <table id="flight-table">
          <tr>
            <th>Flight Number</th>
            <th>Departure City</th>
            <th>Arrival City</th>
            <th>date</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Actions</th>
          </tr>
          <tr>
            <td>A12345</td>
            <td>Colombo</td>
            <td>London</td>
            <td>2000-01-01</td>
            <td>12:00</td>
            <td>18:00</td>
            <td>
              <button class="edit-button">Edit</button>
              <button class="delete-button">Delete</button>
            </td>
          </tr>
        </table>
        <br />
      </div>
    </div>
  );
}
