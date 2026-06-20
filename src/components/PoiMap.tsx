"use client";

import { APIProvider, Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useEffect } from "react";
import { pois } from "@/data/pois";

function ClusteredMarkers() {
  const map = useMap();
  const markerLibrary = useMapsLibrary("marker");

  useEffect(() => {
    if (!map || !markerLibrary) return;

    const markers = pois.map((poi) => {
      const marker = new markerLibrary.AdvancedMarkerElement({
        position: { lat: poi.lat, lng: poi.lng },
        title: poi.title,
      });

      const markerContent = document.createElement("div");
      markerContent.className =
        "rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-lg";
      markerContent.textContent = poi.title;

      marker.content = markerContent;

      return marker;
    });

    const clusterer = new MarkerClusterer({
      map,
      markers,
    });

    return () => {
      clusterer.clearMarkers();
      markers.forEach((marker) => {
        marker.map = null;
      });
    };
  }, [map, markerLibrary]);

  return null;
}

export default function PoiMap() {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <Map
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
        defaultCenter={{ lat: 51.8862, lng: 5.4297 }}
        defaultZoom={10}
        gestureHandling="greedy"
        disableDefaultUI={false}
        className="h-[600px] w-full rounded-2xl"
      >
        <ClusteredMarkers />
      </Map>
    </APIProvider>
  );
}