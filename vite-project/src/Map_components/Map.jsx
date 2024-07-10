// src/MapComponent.js
import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import RoutingMachine from './Route';
import L from 'leaflet';

// Fixing the marker icon issue
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// let DefaultIcon = L.icon({
//   iconUrl: markerIcon,
//   iconRetinaUrl: markerIcon2x,
//   shadowUrl: markerShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   tooltipAnchor: [16, -28],
//   shadowSize: [41, 41]
// });

// L.Marker.prototype.options.icon = DefaultIcon;

const MapClickHandler = ({end, setStart, setEnd, enable }) => {
  const map = useMapEvents({
    click: (event) => {
        setEnd(event.latlng);
      console.log("Clicked position: ", event.latlng);
      if(enable) setStart(null)
    },
  });

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
        setStart(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      console.log("User location: ", e.latlng);
    });
  }, [map, setStart, ...(enable ? [end] : [])]);

  return null
};

const MapComponent = () => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [showRoute, setShowRoute] = useState(true)

  return (
    <div>
    <button onClick={() => setShowRoute(prev => !prev)}>{showRoute ? "Disable Routing" : "Enable routing" }</button>
    <MapContainer center={[23.7542, 90.3886]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler setStart={setStart} end={end} setEnd={setEnd} enable={showRoute} />
      {showRoute && start && end && (
        <RoutingMachine start={start} end={end} color="blue" />
      )}
      {!showRoute && end && (
        <Marker position={end}>
            <Popup>{end.lat.toFixed(3)}, {end.lng.toFixed(3)}</Popup>
        </Marker>
      )}
    </MapContainer>
    </div>
  );
};

export default MapComponent;
