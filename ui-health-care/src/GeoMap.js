import React,{useState} from 'react'
import { GoogleMap, useJsApiLoader,InfoWindow, Marker } from '@react-google-maps/api';


const containerStyle = {
  width: '400px',
  height: '400px'
};



function GeoMap(props) {
  const markers = props.markers;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBD0WVGaI0T0JpmCT6eWu--bx0Q-Xsi06k"
  })

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return isLoaded ? (
      <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "40vw", height: "60vh" }}
      center={props.center}
      zoom={props.zoom}
      >
       {markers.map(({ id, name, position }) => (
        <Marker
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{name}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
        <></>
      </GoogleMap>
  ) : <></>
}

export default GeoMap;