"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Trophy } from "lucide-react";

export default function RankingsPage() {
    return (
        <div className="space-y-12">
            <header className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                        <Trophy className="text-amber-400" size={32} />
                    </div>
                    <div>
                        <h1 className="text-title">Sector Rankings</h1>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Ward Performance Leaderboard</p>
                    </div>
                </div>
            </header>

            <div className="bento-tile p-12 flex flex-col items-center justify-center text-center space-y-6">
                <BarChart3 size={64} className="text-slate-800 animate-pulse" />
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Compiling Real-Time Records</h2>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-2">The Grid is currently processing 1,402 new resolutions.</p>
                </div>
            </div>
        </div>
    );
}
