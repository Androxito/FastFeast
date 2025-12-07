import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import SearchControl from "./SearchControl";  // ← importa el buscador

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapaSelector = ({ onSelect }) => {
  const [pos, setPos] = useState(null);

  const MapaClick = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPos([lat, lng]);
        onSelect(parseFloat(lat.toFixed(6)), parseFloat(lng.toFixed(6)));
      },
    });
    return null;
  };

  return (
    <div style={{ height: "300px", width: "100%", marginBottom: "20px" }}>
      <MapContainer
        center={[27.4828, -109.9304]}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />

        {/* 🔍 Buscador agregado */}
        <SearchControl onSelect={(lat, lng) => { 
          setPos([lat, lng]); 
          onSelect(lat, lng); 
        }}/>

        <MapaClick />

        {pos && <Marker position={pos} icon={icon} />}
      </MapContainer>
    </div>
  );
};

export default MapaSelector;
