import React from "react";
import "../../App.css";
import "./Admin.css";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import AdminNavbar from "../AdminNavbar";
import axios from "axios";
import { useToken } from "./token";

export default function AdminPassengers() {
  return (
    <div>
      <AdminNavbar />
      <div className="container">
        <Link to="/admin-home">
          <Button
            className="find-a-flight-btn"
            buttonStyle="btn--black"
            buttonSize="btn--black_size"
          >
            Home
          </Button>
        </Link>
        <Link to="/admin-flights">
          <Button
            className="find-a-flight-btn"
            buttonStyle="btn--black"
            buttonSize="btn--black_size"
          >
            Flights
          </Button>
        </Link>
      </div>
      <div className="container">
        <h1>B Airways Admin Portal</h1>
        <br />
        <h1 className="topic">Bookings</h1>
        <br />
        <table id="bookings-table">
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
      </div>
    </div>
  );
}
