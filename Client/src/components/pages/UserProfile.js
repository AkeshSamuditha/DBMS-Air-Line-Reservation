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
  const [Pastflights, setPastflights] = useState([]);
  const [token, setToken] = useToken();

  useEffect(() => {
    axios
      .get("http://localhost:6969/auth/api/BookedFlightDetails", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => pastFlightDetails(response))
      .catch((error) => console.log(error));
  }, []);

  function pastFlightDetails(response) {
    console.log(response);
    setPastflights(response.data);
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
              <h3>PREVIOUS FLIGHTS WIHT US...</h3>
              <br />
              <div className="flight-table">
                {/* <DataGrid columns={columns} rows={rows} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
