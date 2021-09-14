import React from "react";

function Home(props) {
  return (
  <div>
    <span className="tagline">Let us help you find plans...</span>
    <div className="boxes">
  <form>
    <input type="text" placeholder="City"/>
    <input type="text" placeholder="Zip Code"/>
    <input type="text" placeholder="Date"/>
    <input type="text" placeholder="Radius"/>
    </form>
  </div>
  <button onClick="">Search</button>
  </div>
  );
}

export default Home;
