"use client";

import { motion } from "framer-motion";
import { Bell, ShieldAlert } from "lucide-react";

export default function NotificationsPage() {
    return (
        <div className="space-y-12">
            <header className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/20">
                        <Bell className="text-rose-400" size={32} />
                    </div>
                    <div>
                        <h1 className="text-title">Alert Center</h1>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Grid Intelligence & SLA Breaches</p>
                    </div>
                </div>
            </header>

            <div className="bento-tile p-12 flex flex-col items-center justify-center text-center space-y-6">
                <ShieldAlert size={64} className="text-slate-800 animate-pulse" />
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tighter uppercase">No Critical Breaches</h2>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-2">The accountability layer is currently stable across all segments.</p>
                </div>
            </div>
        </div>
    );
}
