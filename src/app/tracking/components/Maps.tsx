"use client";

import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import React from "react";

const GoogleMapComponent = () => {
  const [position, setPosition] = useState(null);
  const addressFromStorage =
    typeof window !== "undefined" ? localStorage.getItem("address") : null;
  const currAddress = addressFromStorage
    ? JSON.parse(addressFromStorage)
    : null;
  const { line1: address, city, country } = currAddress || {};

  useEffect(() => {
    if (
      address &&
      city &&
      country &&
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    ) {
      const fetchCoordinates = async () => {
        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              address
            )},${encodeURIComponent(city)},${encodeURIComponent(country)}&key=${
              process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
            }`
          );
          if (res.ok) {
            const data = await res.json();
            if (data.results && data.results.length > 0) {
              setPosition(data.results[0].geometry.location);
            }
          }
        } catch (e) {
          console.log(e);
        }
      };

      fetchCoordinates();
    }
  }, [address, city, country]);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div
        className="h-[50vh] w-[50vh] border border-gray-400"
        data-testid="map"
      >
        {position ? (
          <Map
            zoom={14}
            center={position}
            mapId={process.env.NEXT_PUBLIC_MAP_ID}
          >
            <AdvancedMarker position={position}>
              <Pin
                borderColor={"red"}
                background={"red"}
                glyphColor={"white"}
              />
            </AdvancedMarker>
          </Map>
        ) : (
          <div>Loading map...</div>
        )}
      </div>
    </APIProvider>
  );
};

export default React.memo(GoogleMapComponent);
