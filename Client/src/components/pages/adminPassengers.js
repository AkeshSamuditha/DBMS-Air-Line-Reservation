import React from "react";
import "../../App.css";

export default function adminPassengers() {
  return (
    <div>
      <div className="container">
        <h1>B Airways Admin Portal</h1>
        <br />
        <h1 className="topic">Bookings</h1>
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
      </div>
    </div>
  );
}
