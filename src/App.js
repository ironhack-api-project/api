import React from "react";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Events from "./components/Events";
import ticket from './ticket.png';

//Ticketmaster API Key = biW1fGE1aeVKqhiGWAdGttCRSItyVN2z

function App() {
  return (
    <div className="App">
      <header>
        <span className="ticket"><img src={ticket} width="50" alt="ticket" /></span>
        <h1>getBooked</h1>
      </header>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/events" component={Events} />
      </Switch>
    </div>
  );
}

export default App;
