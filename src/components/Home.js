import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function Home(props) {
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      //   x.innerHTML = "Geolocation is not supported by this browser.";
    }
  };
  const showPosition = (position) => {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return <div>HOME</div>;
}

export default Home;
