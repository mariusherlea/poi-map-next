export type Poi = {
  id: number;
  title: string;
  category: "restaurant" | "parking" | "hotel" | "service";
  lat: number;
  lng: number;
};

export const pois: Poi[] = [
  {
    id: 1,
    title: "Restaurant Lienden",
    category: "restaurant",
    lat: 51.9487,
    lng: 5.5201,
  },
  {
    id: 2,
    title: "Parcare Tiel",
    category: "parking",
    lat: 51.8862,
    lng: 5.4297,
  },
  {
    id: 3,
    title: "Service Auto Tiel",
    category: "service",
    lat: 51.8891,
    lng: 5.4352,
  },
];