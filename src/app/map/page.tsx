"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
const AccountabilityMap = dynamic(() => import("@/components/shared/AccountabilityMap"), { ssr: false });
import { Search, Filter, Layers, Navigation } from "lucide-react";

export default function MapPage() {
    const [issues] = useState([
        { id: "1", latitude: 19.0760, longitude: 72.8777, status: "OPEN" as const, category: "Drainage" },
        { id: "2", latitude: 19.0850, longitude: 72.8900, status: "RESOLVED" as const, category: "Roads" },
        { id: "3", latitude: 19.0650, longitude: 72.8600, status: "PENDING" as const, category: "Water" },
    ]);

    return (
        <div className="h-[calc(100vh-64px)] w-full flex flex-col md:flex-row">
            {/* Sidebar Overlay (Map Controls) */}
            <div className="w-full md:w-96 glass-card rounded-none border-y-0 border-l-0 border-r border-glass-border p-6 flex flex-col gap-6 z-20">
                <div>
                    <h1 className="text-2xl font-black tracking-tighter text-white mb-2">Accountability Grid</h1>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live Spatial Performance Data</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search Ward or Issue..."
                        className="w-full h-12 glass-card bg-white/5 pl-10 pr-4 text-sm font-medium outline-none border-glass-border focus:border-sky-500/50 transition-all"
                    />
                </div>

                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2">Layer View</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <button className="h-12 glass-card flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest bg-sky-500/5 border-sky-500/30 text-sky-400">
                            <Layers size={14} /> Heatmap
                        </button>
                        <button className="h-12 glass-card flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-white/5">
                            <Navigation size={14} /> Clusters
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2">Active Breaches (Critical)</h3>
                    {issues.filter(i => i.status === "OPEN").map(issue => (
                        <div key={issue.id} className="p-4 glass-card border-rose-500/20 bg-rose-500/5 group cursor-pointer hover:bg-rose-500/10 transition-all">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">{issue.category}</p>
                                <p className="text-[10px] font-bold text-slate-500">48h+ Active</p>
                            </div>
                            <p className="text-xs font-bold text-slate-white mb-1">Severe Water Leakage near Terminal 1</p>
                            <p className="text-[10px] text-slate-500">RESOLVE BY: 18 FEB 2026</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Map Area */}
            <div className="flex-1 relative">
                <AccountabilityMap issues={issues} />
            </div>
        </div>
    );
}
