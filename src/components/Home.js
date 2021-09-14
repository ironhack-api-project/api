import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function Home(props) {
  let [events, setEvents] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let eventKeyWord = e.target[0].value;
    let eventCity = e.target[1].value;
    let eventDate = e.target[2].value;
    console.log(eventDate);

    let linkApi =
      "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&keyword=";

    let keyApi = "biW1fGE1aeVKqhiGWAdGttCRSItyVN2z";
    // ("city=${eventCity}&keyword=tinashe&apikey=");

    let linkToAxios =
      linkApi +
      eventKeyWord +
      "&city=" +
      eventCity +
      "&apikey=biW1fGE1aeVKqhiGWAdGttCRSItyVN2z";
    console.log(typeof linkToAxios);

    axios.get(linkToAxios).then((resApi) => {
      setEvents(resApi.data._embedded.events);
    });
  };

  const ShowEvents = () => {
    return (
      <div className="events">
        {events.map((uniqueEvent) => {
         
          let img = [...uniqueEvent.images].filter((im) => im.width > 1000);
          return (
            <div key={uniqueEvent.id}>
              <img src={img[0].url} width="500" />
              <div><h2>{uniqueEvent.name}</h2></div>
              <div><strong>Time</strong>: {uniqueEvent.dates.start.localTime}</div>
              <div><strong>Date</strong>: {uniqueEvent.dates.start.localDate}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      //   x.innerHTML = "Geolocation is not supported by this browser.";
    }
  };
  const showPosition = (position) => {
    // console.log(position.coords.latitude);
    // console.log(position.coords.longitude);
  };

  useEffect(() => {
    getLocation();
  }, []);

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
      <ShowEvents />
    </div>
  );
}

export default Home;
