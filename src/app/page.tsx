import PoiMap from "@/components/PoiMap";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          POI Map
        </h1>

        <p className="mb-6 text-slate-600">
          Punctele de interes apar doar când faci zoom în zona lor.
        </p>

        <PoiMap />
      </div>
    </main>
  );
}