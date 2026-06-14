"use client";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { pois, type Poi } from "@/data/pois";

function VisibleMarkers() {
  const map = useMap();
  const [visiblePois, setVisiblePois] = useState<Poi[]>([]);

  useEffect(() => {
    if (!map) return;

    const updateVisiblePois = () => {
      const bounds = map.getBounds();
      const zoom = map.getZoom();

      if (!bounds || !zoom || zoom < 13) {
        setVisiblePois([]);
        return;
      }

      const filteredPois = pois.filter((poi) =>
        bounds.contains({
          lat: poi.lat,
          lng: poi.lng,
        })
      );

      setVisiblePois(filteredPois);
    };

    updateVisiblePois();

    const listener = map.addListener("idle", updateVisiblePois);

    return () => {
      listener.remove();
    };
  }, [map]);

  return (
    <>
      {visiblePois.map((poi) => (
        <AdvancedMarker
          key={poi.id}
          position={{ lat: poi.lat, lng: poi.lng }}
          title={poi.title}
        >
          <div className="rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-lg">
            {poi.title}
          </div>
        </AdvancedMarker>
      ))}
    </>
  );
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
        <VisibleMarkers />
      </Map>
    </APIProvider>
  );
}