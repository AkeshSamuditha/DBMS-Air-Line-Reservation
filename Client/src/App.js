import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BookAFlight from "./components/pages/BookAFlight";
import Destinations from "./components/pages/Destinations";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/book-a-flight" component={BookAFlight} />
          <Route path="/destinations" component={Destinations} />
          <Route path="/log-in" component={LogIn} />
          <Route path="/sign-up" component={SignUp} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
