// axios.get("http://localhost:6969/api/getFlights", {
//     params: {
//       From: "BIA",
//       To: "JFK",
//       From_Date: "2023-01-01",
//       To_Date: "2024-01-01",
//     }
//       .then(response => {
//         console.log("shit", response);
//         if (response.data.status == "400") {
//           setLoginStatus("Invalid Username or Passwrod");
//         } else {
//           console.log(response);
//           handleLogin(response);
//           window.location.reload();
//         }
//       });
//   };

// Request_No: 09
const AvailableSeats = () => {
    axios.get("http://localhost:6969/api/AvailableSeats", {
        params: {
            Flight_ID: "F1",
        }
    })
    .then(response => handleReponse(response))
    .catch(error => console.log(error));    
}

//function to handle the response
function handleReponse(response) {
};


// Request_No: 12
const SeatPrice = () => {
    axios.get("http://localhost:6969/admin/api/SeatPrice", {
        params: {    
            Route : "R1",
            Class: "F",
        },
        headers: {
            Authorization: token,
          }
      })
      .then(response => handleReponse(response))
        .catch(error => console.log(error));
  };

// Request_No: 14
const FlightStatus = () => {
    axios.get("http://localhost:6969/api/FlightStatus", {
        params: {
            Flight_ID: "F1",
        }
      })
      .then(response => handleReponse(response))
      .catch(error => console.log(error));
}


// Request_No: 15
const getDestinations = () => {
    axios.get("http://localhost:6969/api/getDestinations", {
        params: {
            Flight_ID: "F1",
        }
      })
      .then(response => handleReponse(response))
        .catch(error => console.log(error));
    }

// Request_No: 11
const CancelBokking = () => {
    axios.post("http://localhost:6969/api/CancelBooking", {
        Ticket_ID: "T1",
      })
    .then(response => handleReponse(response))
    .catch(error => console.log(error));
}

// Request_No: 10
const Bookflight = () => {
    axios.post("http://localhost:6969/api/Bookflight", {
            Flight_ID: "F1",
            Class: "F",
            Seat_ID: "1",
            PID: "P1",
            Adult_or_Child: "A",
      })
      .then(response => handleReponse(response))
      .catch(error => console.log(error));
}

// Request_No: 13
const GuestLogin = () => {
    axios.post("http://localhost:6969/api/GuestLogin", {
        Title: "Mr",
        First_Name: "John",
        Last_Name: "Doe",
        Email: "Huu@mymail.com",
        Telephone: "123",
        Country: "USA",
    })
    .then(response => handleReponse(response))
    .catch(error => console.log(error));
}

// Request_No: 16
const BookedFlightDetails = () => {
    axios.get("http://localhost:6969/registered/BookedFlightDetails", {
        headers: {
            authorization: token,
        }
    })
    .then(response => handleReponse(response))
    .catch(error => console.log(error));
};

// Request_No: 17
const Pastflights = () => {
    axios.get("http://localhost:6969/registered/Pastflights", {
        headers: {
            authorization: token,
        }
    })
    .then(response => handleReponse(response))
    .catch(error => console.log(error));
};

//////////////////////////////ADMIN REQUESTS////////////////////////////////

// Request_No: 01

const getPassengersByflight = () => {
    axios.get("http://localhost:6969/admin/api/getPassengersByflight", {
        params: {
            Flight_ID: "F1",
        }
    })
    .then(response => handleReponse(response))
    .catch(error => console.log(error));
};
