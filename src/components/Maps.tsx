"use client";

import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import React from "react";

export default React.memo(() => {
  const [position, setPosition] = useState();
  const addressFromStorage = localStorage.getItem("address");
  const currAdress = addressFromStorage ? JSON.parse(addressFromStorage) : null;
  const { line1: address, city, country } = currAdress;

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${address},+${city},+${country}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        if (res) {
          return res.json();
        }
        return;
      } catch (e) {
        console.log(e);
      }
    };
    fetchCoordinates().then((data) => {
      if (data) {
        setPosition(data.results[0].geometry?.location);
      }
    });
  }, []);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="h-[50vh] w-[50vh] border border-gray-400">
        <Map zoom={14} center={position} mapId={process.env.NEXT_PUBLIC_MAP_ID}>
          <AdvancedMarker position={position}>
            <Pin
              borderColor={"red"}
              background={"red"}
              glyphColor={"white"}
            ></Pin>
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
});
