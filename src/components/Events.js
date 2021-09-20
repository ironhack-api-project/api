import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import backarrow from "../backarrow.png";
import price from "../price.png";
import ticketmaster from "../ticketmaster.png";
import GoogleMaps from "simple-react-google-maps";
function Events(props) {
  const [event, setEvent] = useState({});
  const [seatMap, setSeatMap] = useState(false);
  const [img, setImg] = useState([]);
  const history = useHistory();
  const [lat, setLat] = useState(undefined);
  const [lng, setLng] = useState(undefined);
  useEffect(() => {
    axios
      .get(
        `https://iron-cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/events.json?id=${props.match.params.eventId}&apikey=biW1fGE1aeVKqhiGWAdGttCRSItyVN2z`
      )
      .then((resApi) => {
        setEvent(resApi.data._embedded.events[0]);
        setImg(
          resApi.data._embedded.events[0].images.find((im) => im.width > 1000)
        );
        setLat(
          Number(
            resApi.data._embedded?.events[0]._embedded?.venues?.[0]?.location
              ?.latitude
          )
        );
        setLng(
          Number(
            resApi.data._embedded?.events[0]._embedded?.venues?.[0]?.location
              ?.longitude
          )
        );
      });
  }, []);

  return (
    <div>
      <div>
        <div className="eventsimage">
          <img src={img?.url} />
          <div className="eventtitle">
            <h1>{event.name}</h1>
          </div>
        </div>
        <div class="container">
          <button className="goback" onClick={() => history.goBack()}>
            <img src={backarrow} /> Back to Results
          </button>
          <br></br>
          <br></br>
          <div className="information">
            <div className="information_left">
              <div className="dateandtime">
                <h3>Address: {event._embedded?.venues?.[0]?.address?.line1}</h3>
                <br></br>
                {/* Display Event Date */}
                {!event.dates?.start?.localDate ? null : (
                  <h3>Date: {event.dates?.start?.localDate}</h3>
                )}
                <br></br>
                {/* Display Event Time */}
                {!event.dates?.start?.localTime ? null : (
                  <h3>Event starts at: {event.dates?.start?.localTime}</h3>
                )}
              </div>
              <br></br>
              <div className="price">
                {/* Display Price Range */}
                {!event.priceRanges?.[0]?.min ? (
                  <p>
                    <img src={price} /> Price on Ticketmaster
                  </p>
                ) : (
                  <h4>
                    <img src={price} /> Price Ranges: $
                    {event.priceRanges?.[0]?.min} to $
                    {event.priceRanges?.[0]?.max}
                  </h4>
                )}
              </div>
              <br></br>
              <div className="ticketmaster">
                <img src={ticketmaster} />{" "}
                <a href={event.url} target="_blank">
                  Ticketmaster
                </a>
              </div>
            </div>
            <div className="information_right">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id
              rhoncus justo. Quisque augue enim, pharetra non augue eu,
              convallis feugiat odio. Donec non urna non quam pretium gravida.
              Ut congue metus et ex volutpat semper. Etiam scelerisque risus
              vitae metus mollis eleifend. Nunc blandit dictum ex, eget egestas
              nisi vulputate vitae. In non risus nec dolor vehicula facilisis.
              Nullam in dictum massa. Praesent molestie quam turpis, vitae
              fringilla est tristique vel. Nullam volutpat purus sit amet
              vulputate venenatis. Etiam ac augue scelerisque ante semper
              porttitor. Vestibulum quis consectetur tortor. Proin semper
              lacinia est sed maximus. Quisque fermentum tempor diam, eu
              consectetur eros tempus vel. Morbi ut ex risus. Fusce sapien nisi,
              molestie vitae placerat nec, fringilla vel lectus.<br></br>
              <br></br>
              {/* Display event promoter */}
              {!event.promoter?.description ? null : (
                <h3>{event.promoter?.description}</h3>
              )}
              <br></br>
              {/* display venue information */}
              {!event._embedded?.venues?.[0]?.name ? null : (
                <div>
                  <h3>Place: {event._embedded?.venues?.[0]?.name}</h3>
                  <img
                    src={event._embedded?.venues?.[0]?.images?.[0]?.url}
                    className="resultimage"
                  ></img>
                </div>
              )}
              {/* Display seat map */}
              {!seatMap ? (
                <button
                  className="seatmapbutton"
                  onClick={() => setSeatMap(!seatMap)}
                >
                  See Seatmap
                </button>
              ) : null}
              {seatMap ? (
                <div>
                  <button
                    className="seatmapbutton"
                    onClick={() => setSeatMap(!seatMap)}
                  >
                    Hide Seatmap
                  </button>
                  <br />
                  <img src={event.seatmap?.staticUrl} className="resultimage" />
                </div>
              ) : null}
              {/* Google Maps */}
            </div>
          </div>
          <div className="#googleMap">
            {lat !== undefined && lng !== undefined ? (
              <GoogleMaps
                apiKey={"AIzaSyDpNWO4_ipZqYPNlP4BbQqbXYui2KCUhrg"}
                style={{
                  height: "400px",
                  width: "1024px",
                  position: "absolute",
                }}
                zoom={15}
                center={{ lat: lat, lng: lng }}
                markers={{ lat: lat, lng: lng }}
              />
            ) : (
              "loading"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Events;
