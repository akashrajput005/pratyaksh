"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

// Fix for default Leaflet marker icons in Next.js
const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface IssuePin {
    id: string;
    latitude: number;
    longitude: number;
    status: "OPEN" | "RESOLVED" | "PENDING";
    category: string;
}

// Custom Marker Component to use DivIcon for Solaris styles
function SolarisMarker({ issue }: { issue: IssuePin }) {
    const customIcon = L.divIcon({
        className: "custom-div-icon",
        html: `<div class="w-4 h-4 rounded-full border-2 border-white shadow-[0_0_10px_rgba(255,255,255,0.5)] ${issue.status === "OPEN" ? "bg-rose-500" : issue.status === "RESOLVED" ? "bg-emerald-500" : "bg-amber-500"
            }"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
    });

    return (
        <Marker position={[issue.latitude, issue.longitude]} icon={customIcon}>
            <Popup className="solaris-popup">
                <div className="p-2 bg-slate-900 text-white rounded shadow-xl border border-glass-border min-w-[150px]">
                    <h3 className="font-bold text-xs uppercase tracking-widest text-sky-400 mb-1 leading-none">{issue.category}</h3>
                    <p className="text-[10px] font-bold text-slate-300">STATUS: <span className={cn(
                        issue.status === "OPEN" ? "text-rose-400" : issue.status === "RESOLVED" ? "text-emerald-400" : "text-amber-400"
                    )}>${issue.status}</span></p>
                    <div className="mt-2 text-[9px] text-sky-400 underline cursor-pointer font-black tracking-tighter uppercase">VIEW FULL GRID REPORT</div>
                </div>
            </Popup>
        </Marker>
    );
}

export default function AccountabilityMap({ issues }: { issues: IssuePin[] }) {
    const mumbaiCenter: [number, number] = [19.0760, 72.8777];

    return (
        <div className="relative w-full h-full glass-card overflow-hidden z-10">
            <MapContainer
                center={mumbaiCenter}
                zoom={11}
                scrollWheelZoom={true}
                className="absolute inset-0 z-0 h-full w-full"
                zoomControl={false}
            >
                {/* CartoDB Dark Matter - No Token Required, High Fidelity Dark Mode */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {issues.map((issue) => (
                    <SolarisMarker key={issue.id} issue={issue} />
                ))}
            </MapContainer>

            {/* Map UI Overlay */}
            <div className="absolute top-6 left-6 z-[400] space-y-3 pointer-events-none">
                <div className="bento-tile px-5 py-3 bg-[#020617] border-white/10 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#22d3ee]" />
                    <div>
                        <p className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">GRID_ACTIVE</p>
                        <p className="text-xs font-mono text-white tracking-tighter">19.0760N, 72.8777E</p>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 right-10 z-[400] flex flex-col gap-3 pointer-events-none">
                <div className="flex items-center gap-3 bento-tile px-4 py-2 bg-[#020617]/90 text-[10px] font-black text-white uppercase tracking-widest border-white/10">
                    <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_12px_#f43f5e]" />
                    <span>SLA Breach</span>
                </div>
                <div className="flex items-center gap-3 bento-tile px-4 py-2 bg-[#020617]/90 text-[10px] font-black text-white uppercase tracking-widest border-white/10">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981]" />
                    <span>Verified Grid</span>
                </div>
            </div>

            {/* Internal Leaflet Overrides */}
            <style jsx global>{`
        .leaflet-container {
          background: #020617 !important;
        }
        .leaflet-tile-container img {
          filter: brightness(0.6) contrast(1.2) saturate(0.5) hue-rotate(10deg) invert(1) opacity(0.8);
        }
        .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .leaflet-popup-tip-container {
          display: none;
        }
        .leaflet-popup-content {
          margin: 0 !important;
        }
      `}</style>
        </div>
    );
}
