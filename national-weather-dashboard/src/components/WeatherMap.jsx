import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Link } from "react-router-dom";

const eventColors = {
  Flood: "red",
  "Heavy Rainfall": "blue",
  Heatwave: "gold",
  Thunderstorm: "purple",
  "Dust Storm": "orange",
};

function createIcon(event) {
  const color = eventColors[event] || "blue";

  return L.divIcon({
    className: "",
    html: `
      <div style="
        width:18px;
        height:18px;
        border-radius:50%;
        background:${color};
        border:3px solid white;
        box-shadow:0 2px 8px rgba(0,0,0,.35);
      "></div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

export default function WeatherMap({ reports }) {
  return (
    <div className="h-[500px] overflow-hidden rounded-2xl border border-slate-200">
      <MapContainer
        center={[22.5, 79]}
        zoom={4.5}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[
              report.latitude,
              report.longitude,
            ]}
            icon={createIcon(report.event)}
          >
            <Popup>
              <div className="min-w-[180px]">
                <h3 className="font-bold">
                  {report.event}
                </h3>

                <p className="text-sm">
                  📍 {report.city}, {report.state}
                </p>

                <p className="mt-1 text-sm">
                  AI Confidence: {report.confidence}%
                </p>

                <Link
                  to={`/reports/${report.id}`}
                  className="mt-3 inline-block text-sm font-semibold text-blue-600"
                >
                  View Report →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}