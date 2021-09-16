import GoogleMaps from "simple-react-google-maps"


// const  initMap= () =>{
//     const googleMaps= ("https://maps.googleapis.com/maps/api/js?key=AIzaSyDpNWO4_ipZqYPNlP4BbQqbXYui2KCUhrg&callback=initMap&libraries=&v=weekly")  
//     // The location 
//     const location = { lat: -25.344, lng: 131.036 };
//     // The map, centered at location
//     const map = new google.maps.Map(googleMaps, {
//       zoom: 4,
//       center: location,
//     });
//     // The marker, positioned at location
//     const marker = new google.maps.Marker({
//       position: location,
//       map: map,
//     });
const GoogleMapContainer = (lat,lng) => {
    return (
        <div>
<GoogleMaps
  apiKey={"AIzaSyDpNWO4_ipZqYPNlP4BbQqbXYui2KCUhrg"}
  style={{height: "400px", width: "100%"}}
  zoom={6}
  center={{lat: 37.4224764, lng: -112.0842499}}
  markers={{lat: 37.4224764, lng: -112.0842499}} //optional
/>
           
        </div>
    );
};

export default GoogleMapContainer;