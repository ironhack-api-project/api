import React from "react";

function Home(props) {
  return (
  <div>
    <span className="tagline">Let us help you find plans...</span>
  <form>
    <input type="text" placeholder="City"/>
    <input type="text" placeholder="Zip Code"/>
  </form>
  <form>
    <input type="text" placeholder="Date"/>
    <input type="text" placeholder="Radius"/>
    </form>
  <button onClick="">Search</button>
  </div>
  );
}

export default Home;
