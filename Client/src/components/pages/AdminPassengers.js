import React, { useState, useEffect } from "react";
import "../../App.css";
import "./Admin.css";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import AdminNavbar from "../AdminNavbar";
import axios from "axios";
import { useToken } from "./token";
import dateForamt from "dateformat";

export default function AdminPassengers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [dateOfBooking, setDateOfBooking] = useState("");
  const [flight, setFlight] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:6969/admin/api/passengersInTransit", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => handlePassengerDetails(response))
      .catch((error) => console.log(error));
  }, []);

  function handlePassengerDetails(response) {
    console.log(response);
    setName(response.data[0].Name);
    setEmail(response.data[0].Email);
    setTelephone(response.data[0].Telephone);
    setDateOfBooking(response.data[0].DateOfBooking);
    setFlight(response.data[0].Flight);
    setCountry(response.data[0].Country);
  }

  const [token, setToken] = useToken();

  return (
    <>
      {token ? (
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
            <h1 className="topic">Passengers in Transit</h1>
            <br />
            <table id="bookings-table">
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Telephone</th>
                  <th>Country</th>
                  <th>Date of Booking</th>
                  <th>Flight</th>
                </tr>
                <tr>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{telephone}</td>
                  <td>{country}</td>
                  <td>{dateForamt(dateOfBooking, "dd/mm/yyyy")}</td>
                  <td>{flight}</td>
                </tr>
              </tbody>
            </table>
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
