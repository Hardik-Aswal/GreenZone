"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useParams } from "next/navigation";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function GroupOrderMap() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const{ pincode }= useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/groupOrders/get?pincode=${pincode}`
        );
        const json = await res.json();
        setData(json.response.groupedOrders);
      } catch (err) {
        console.error("Failed to fetch group orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const parseCoords = (coord: string) =>
    coord.split(",").map(Number) as [number, number];

  if (loading)
    return <div className="text-center text-gray-600 mt-4">Loading map...</div>;
  if (!data)
    return (
      <div className="text-center text-red-500 mt-4">
        No group order data found.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">
        Grouped Orders for Pincode {pincode}
      </h2>

      <div className="mb-3 text-center text-lg text-gray-700">
        Total Grouped Distance:{" "}
        <span className="font-semibold text-blue-600">{data.distance/1000} km</span>
      </div>

      <div className="h-[500px] w-full rounded-md overflow-hidden">
        <MapContainer
          center={[28.57, 77.33]}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

   
          {Object.entries(data.coordToOrders as Record<string, string[]>).map(
  ([coordStr, orders]) => {

              const pos = parseCoords(coordStr);
              return (
                <Marker key={coordStr} position={pos}>
                  <Popup>
                    <strong>Orders:</strong>
                    <ul className="mt-1 list-disc list-inside">
                      {orders.map((id) => (
                        <li key={id} className="text-xs break-all">
                          {id}
                        </li>
                      ))}
                    </ul>
                  </Popup>
                </Marker>
              );
            }
          )}

 
          {data.Links.map(
            (
              [from, to]: [[number, number], [number, number]],
              idx: number
            ) => (
              <Polyline
                key={idx}
                positions={[from, to]}
                pathOptions={{ color: "blue", weight: 3 }}
              />
            )
          )}
        </MapContainer>
      </div>
    </div>
  );
}
