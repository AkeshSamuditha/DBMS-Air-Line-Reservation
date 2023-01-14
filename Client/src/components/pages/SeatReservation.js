import React, { useState, useEffect } from "react";
import "../../App.css";
import "./SeatReservation.css";
import { Link } from "react-router-dom";
import { Button, Button2 } from "../Button";
import Navbar from "../Navbar";
import { useToken } from "./token";
import { useRoute } from "./Route";
import { useFlight } from "./Flight";
import axios from "axios";
import styled from "styled-components";


const theme = {
  blue: {
    default: "#3f51b5",
    hover: "#283593"
  },
  pink: {
    default: "#e91e63",
    hover: "#ad1457"
  }
};

const Butto = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Butto.defaultProps = {
  theme: "blue"
};

const ButtonToggle = styled(Butto)`
  opacity: 0.7;
  ${({ active }) =>
    active &&
    `opacity: 1; 
  `}
`;



export default function SeatReservation() {
  const [noOfSeats, setnoOfSeats] = useState(40);
  const [price, setPrice] = useState();
  const [classes, setClasses] = useState("");
  const [selected, setSelected] = useState(false);
  const [temp, setTemp] = useState("");
  const [Route_ID, setRoute_ID] = useRoute();
  const [Flight_ID, setFlight_ID] = useFlight();
  const [type, setType] = useState("");
  // const [selectedSeat, setSelectedSeat] = useState(null);
  const [active, setActive] = useState(0);

let types = [];
for (let i = 1; i <= noOfSeats ; i++) {
  types.push(i);
}


function ToggleGroup() {  
  return (
    <div>
      {types.map((x) => (
        <ButtonToggle 
        active={active === x} 
        onClick={() => setActive(x)}>
          {x}
        </ButtonToggle>
      ))}
      <p />
      <p> Your payment selection: {active} </p>
    </div>
  );
}


  useEffect(() => {
    localStorage.getItem("Route_ID", Route_ID);
  }, [Route_ID]);
  
  const [token, setToken] = useToken();


  const getPrice = () => {
    axios
      .get("http://localhost:6969/Api/SeatPrice", {
        headers: {
          Authorization: token,
        },
        params: {
          Route: Route_ID,
          Class: classes,
          Flight_ID: Flight_ID,
        },
      })
      .then((response) => {
        setPrice(response.data[0].price)
        setnoOfSeats(response.data[0].seatlimit
          )
      })
      .catch((error) => console.log(error));
  };

  const Bookflight = () => {
    axios
      .post(
        "http://localhost:6969/api/Bookflight",
        {
          Flight_ID: Flight_ID,
          Class: classes,
          Seat_ID: active,
          Adult_or_Child: type,
        },{
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setClasses(temp);
  }, [temp]);

  useEffect(() => {
    getPrice();
  }, [classes]);

  function handleChange(e) {
    setTemp(e.target.value);
    console.log(Route_ID, active, classes);
  }

  return (
    <>
      <Navbar />
      <div className="seatReservations">
        <div className="reserve-box">
          <div>
            <div>
              <h2>
                <center>You are almost there! Reserve your seat.</center>
              </h2>
            </div>
            <br />
            <div className="Parent">
              <div className="child1">
                <label>Type</label>
                <br />
                <select
                  name="adults"
                  className="input-box"
                  id="adults"
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="default" hidden>
                    Select
                  </option>
                  <option value="1" hidden>
                    Type
                  </option>
                  <option value="A">Adult</option>
                  <option value="C">Child</option>
                </select>
              </div>
              <div className="child2">
                <label>Class</label>
                <br />
                <select
                  id="class"
                  className="input-box"
                  name="class"
                  placeholder="Class"
                  onChange={(e) => {
                    handleChange(e);
                    setSelected(true);
                  }}
                >
                  <option hidden>Select</option>
                  <option value="E">Economy</option>
                  <option value="B">Business</option>
                  <option value="P">Platinum</option>
                </select>
              </div>
            </div>
            <>
              <div>
                {selected ? (
                  <div>
                    <br />
                    <center>Price per Ticket = LKR {price} /=</center>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </>
            <br />
            <div>
              <h3>Select a Desired Seat</h3>
            </div>
          <>
          <ToggleGroup />
          </>
            <div className="table_container">
              <div className="table_align">
                
                <>
                  {token ? (
                    <div className="booking-table-btn">
                      <Button
                        className="find-a-flight-btn"
                        buttonStyle="btn--black"
                        buttonSize="btn--black_size"
                        onClick={Bookflight}
                      >
                        Proceed
                      </Button>
                    </div>
                  ) : (
                    <div className="booking-table-btn">
                      <Link to="/guest-user">
                        <Button
                          className="find-a-flight-btn"
                          buttonStyle="btn--black"
                          buttonSize="btn--black_size"
                        >
                          Proceed
                        </Button>
                      </Link>
                    </div>
                  )}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
