// src/RoutingMachine.js
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutineMachineLayer = ({ start, end, color }) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(start.lat, start.lng),
      L.latLng(end.lat, end.lng),
    ],
    lineOptions: {
      styles: [{ color }],
    },
    addWaypoints: false, // Prevent adding more waypoints on the map
    routeWhileDragging: true,
    draggableWaypoints: false, // Prevent dragging waypoints
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
