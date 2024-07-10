// src/MapClickHandler.js
import React, { useState, useEffect } from 'react';
import { Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapClickHandler = ({ setUserLoc, setPos, pos }) => {
  const map = useMap();
  
    console.log("Mapclick rendered")

  useEffect(() => {
    setUserLoc(map.getCenter());
  }, [map, setUserLoc]);

  useMapEvents({
    click: (event) => {
      setPos(event.latlng);
      console.log("Position: ", event.latlng);
    },
  });

  return (
    pos && (
      <Marker position={pos}>
        <Popup>
          Latitude: {pos.lat.toFixed(3)} <br /> Longitude: {pos.lng.toFixed(3)}
        </Popup>
      </Marker>
    )
  );
};

export default MapClickHandler;
