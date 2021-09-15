import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import backarrow from "../backarrow.png";
import price from "../price.png";
import ticketmaster from "../ticketmaster.png";

function Events(props) {
  let [event, setEvent] = useState({});
  let [seatMap, setSeatMap] = useState(false);
  let [img, setImg] = useState([]);

  let history = useHistory();

  useEffect(() => {
    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?id=${props.match.params.eventId}&apikey=biW1fGE1aeVKqhiGWAdGttCRSItyVN2z`
      )
      .then((resApi) => {
        setEvent(resApi.data._embedded.events[0]);
        setImg(
          resApi.data._embedded.events[0].images.filter((im) => im.width > 1000)
        );
      });
  }, []);
  console.log(event.url);

  return (
    <div>
      <div>
        <div className="eventsimage">
          <img src={img[0]?.url} width="100%" />
          <div class="eventtitle">
            <h1>{event.name}</h1>
          </div>
        </div>
        <div class="container">
          <button className="goback" onClick={() => history.goBack()}>
            <img src={backarrow} /> Back to Results
          </button>
          <br></br>
          <br></br>

          {/* Display covid message */}
          {!event.ticketing?.healthCheck?.summary ? (
            <div className="covid">
              <p>Covid Restrictions</p>
            </div>
          ) : (
            <div className="covid">
              <h3>{event.ticketing?.healthCheck?.summary}</h3>
              <p>{event.ticketing?.healthCheck?.description}</p>
            </div>
          )}
          <br></br>
          <br></br>
          <div className="information">
            <div className="information_left">
              <div className="dateandtime">
                <h3>
                    Address: {event._embedded?.venues?.[0]?.address?.line1}
                  </h3>
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
                {!event.priceRanges?.[0]?.min ? null : (
                  <h4>
                    <img src={price} /> Price Ranges: ${event.priceRanges?.[0]?.min} to $
                    {event.priceRanges?.[0]?.max}
                  </h4>
                )}
              </div>
              <br></br>
              <div className="ticketmaster"><img src={ticketmaster} /> Ticketmaster</div>
            </div>
            <div className="information_right">
              {/* Display event promoter */}
              {!event.promoter?.description ? null : (
                <h3>{event.promoter?.description}</h3>
              )}
              <br></br>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ridiculus
              aliquam velit sit morbi lorem tempus. Pellentesque ornare ultrices
              massa fermentum. Pharetra consectetur ac vel hendrerit eu aliquet
              metus. Fermentum sit lectus pretium vitae scelerisque vitae, vitae
              lorem fringilla. Enim elementum enim aliquam in eu. Risus sit sed
              accumsan neque elit adipiscing sem.<br></br>
              <br></br>
              {/* display venue information */}
              {!event._embedded?.venues?.[0]?.name ? null : (
                <div>
                  <h3>Place: {event._embedded?.venues?.[0]?.name}</h3>
                  <img
                    src={event._embedded?.venues?.[0]?.images?.[0]?.url}
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
                  <img src={event.seatmap?.staticUrl} width="500" />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
