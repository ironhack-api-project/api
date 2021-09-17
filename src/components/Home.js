import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Comment from "./Comment";

function Home(props) {
  let [events, setEvents] = useState([]);
  let [latitude, setLatitude] = useState(0);
  let [longitude, setLongitude] = useState(0);
  let [show, setShow] = useState(props.show);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  };
  const showPosition = (position) => {
    setLatitude(position?.coords?.latitude);
    setLongitude(position?.coords?.longitude);
  };
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
    let eventKeyWord = e.target[0].value;
    let eventCity = e.target[1].value;
    let eventDate = e.target[2].value;
    history.push(
      `/results?keyword=${eventKeyWord}&city=${eventCity}&date=${eventDate}`
    );
  };
  useEffect(() => {
    let mounted = true;
    // getLocation();
    navigator.geolocation.getCurrentPosition((position) => {
      if (mounted) {
        // Add this
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      }
    });
    axios
      .get(
        `https://iron-cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/suggest.json?&countryCode=US&geoPoint=${Number(
          latitude.toFixed(6)
        )},${Number(
          longitude.toFixed(6)
        )}&sort=name,date,asc&apikey=biW1fGE1aeVKqhiGWAdGttCRSItyVN2z`
      )
      .then((resApi) => {
        setEvents(resApi?.data?._embedded?.events);
      });
    return () => {
      mounted = false; // add this
    };
  }, [latitude, longitude]);
  let ShowSuggestions = () => {
    if (events === undefined) {
      return <div>not found</div>;
    } else {
      return (
        <div className="events">
          <h1>Suggestions near you</h1>
          {events?.map((uniqueEvent) => {
            let img = uniqueEvent.images.find((im) => im.width > 1000);
            return (
              <div key={uniqueEvent.id} className="suggestions">
                <Link
                  to={{
                    pathname: `/events/${uniqueEvent.id}`,
                    myCustomProps: uniqueEvent,
                  }}
                >
                  <img src={img.url} className="resultimage" />
                  <div>
                    <h2>{uniqueEvent.name}</h2>
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
    }
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
      {show ? (
        <div>
          <ShowSuggestions />
          <br></br>
          <br></br>
          <Comment />
        </div>
      ) : null}
    </div>
  );
}
export default Home;
