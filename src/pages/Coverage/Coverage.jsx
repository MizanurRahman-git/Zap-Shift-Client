import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const allLocation = useLoaderData();
  const position = [23.8103, 90.4125];
  const mapRef = useRef()

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location?.value;
    const district = allLocation.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if(district){
        const coord = [district.latitude, district.longitude]
        mapRef.current.flyTo(coord, 15)
    }
  };

  return (
    <div>
      <h1>We are available in 64 districts</h1>
      <div>
        <form onSubmit={handleSearch}>
          <div className="join">
            <div>
              <label className="input validator join-item">
                <input
                  type="text"
                  name="location"
                  placeholder="Enter your Address"
                />
              </label>
            </div>
            <button className="btn btn-neutral join-item">Search</button>
          </div>
        </form>
      </div>
      {/* --- */}
      <div className="border w-full h-[600px]">
        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          className="h-[600px]"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {allLocation.map((center) => (
            <Marker position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong>
                <br /> Service Area: {center.covered_area.join(", ")}.
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
