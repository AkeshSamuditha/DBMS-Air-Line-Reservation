import React, { useState, useEffect } from "react";
import "../../App.css";
import Navbar from "../Navbar";
import "./UserProfile.css";
import { useToken } from "./token";
import axios from "axios";
// import { DataGrid } from "@mui/x-data-grid";
// import { DataGrid } from "react-data-grid";

// const columns = [
//   { key: "id", name: "ID" },
//   { key: "title", name: "Title" },
//   { key: "count", name: "Count" },
// ];
// const rows = [
//   { id: 0, title: "row1", count: 20 },
//   { id: 1, title: "row2", count: 40 },
//   { id: 2, title: "row3", count: 60 },
// ];

export default function UserProfile() {

  const [flights0, setFlights0] = useState([]);

  const header = [
    "Flight ID",
    "Origin ID",
    "Destination ID",
    "Date of Travel",
    "Arrival Time",
    "Departure Time",
    "Flight Status",
  ];

  const flight0Values = Object.values(flights0);

  const fullArray = [header, flight0Values];

  const [Pastflights, setPastflights] = useState([]);
  const [token, setToken] = useToken();

  useEffect(() => {
    axios
      .get("http://localhost:6969/api/registered/BookedflightDetails", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => bookedFlightDetails(response))
      .catch((error) => console.log(error));
  }, []);

  function bookedFlightDetails(response) {
    console.log(response);
    setFlights0(response.data[0]);
  }

  return (
    <>
      <Navbar />
      <div>
        <div className="userprofile">
          <h2>Welcome aboard</h2>
        </div>
        <div className="user-container">
          <div className="user">
            <i className={"fas fa-user-circle fa-9x center"} />
            <h3 className="name">John Doe</h3>
            <h5 className="membership">Platinum Member</h5>
            <br />
            <div className="lables">
              <label>Total tickets booked : </label>
              <label>Count</label>
            </div>
            <br />
            <div className="past-flights">
              <h3>UPCOMING FLIGHTS WIHT US...</h3>
              <br />
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* <div className="flight-table">
                <div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
