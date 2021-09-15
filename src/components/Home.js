import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function Home(props) {
  let [events, setEvents] = useState([]);

  const history = useHistory();
  const handleSubmit = (e) => {
    console.log("button");
    e.preventDefault();
    let eventKeyWord = e.target[0].value;
    let eventCity = e.target[1].value;
    let eventDate = e.target[2].value;

    // let linkApi =
    //   "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&keyword=";

    // let linkToAxios =
    //   linkApi +
    //   eventKeyWord +
    //   "&city=" +
    //   eventCity +
    //   "&apikey=biW1fGE1aeVKqhiGWAdGttCRSItyVN2z";

    // axios.get(linkToAxios).then((resApi) => {
    //   setEvents(resApi?.data?._embedded?.events);
    // });
    history.push(`/results?keyword=${eventKeyWord}&city=${eventCity}`);
  };

  return (
    <div>
      <div className="tagline">Let us help you find plans...</div>
      <div className="boxes">
        <form onSubmit={handleSubmit}>
          <div className="input">
            <input type="text" placeholder="Event" />
          </div>
          <div className="input">
            <input type="text" placeholder="City" />
          </div>
          <div className="input">
            <input type="date" placeholder="Date" />
          </div>
          <div className="button">
            <button>Search event</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
