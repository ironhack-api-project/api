import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home(props) {
  let [events, setEvents] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let eventKeyWord = e.target[0].value;
    let eventCity = e.target[1].value;
    // let eventDate = e.target[2].value;

    let linkApi =
      "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&keyword=";

    let linkToAxios =
      linkApi +
      eventKeyWord +
      "&city=" +
      eventCity +
      "&apikey=biW1fGE1aeVKqhiGWAdGttCRSItyVN2z";

    axios.get(linkToAxios).then((resApi) => {
      setEvents(resApi.data._embedded.events);
    });
  };

  const ShowEvents = () => {
    return (
      <div className="events">
        {events.map((uniqueEvent) => {
         
          let img = [...uniqueEvent.images].filter((im) => im.width > 1000);
          let city = [...uniqueEvent._embedded.venues].map((venue) => {
            return venue.city;
          });
          return (
            <div key={uniqueEvent.id}>
              <Link
                to={{
                  pathname: `/events/${uniqueEvent.id}`,
                  myCustomProps: uniqueEvent,
                }}
              >
                <img src={img[0].url} width="500" />
                <div>
                  <h2>{uniqueEvent.name}</h2>
                </div>
                <div>
                  <strong>City</strong>: {city[0].name}
                </div>

                <div>
                  <strong>Time</strong>: {uniqueEvent.dates.start.localTime}
                </div>
                <div>
                  <strong>Date</strong>: {uniqueEvent.dates.start.localDate}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
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
      <ShowEvents />
    </div>
  );
}

export default Home;
