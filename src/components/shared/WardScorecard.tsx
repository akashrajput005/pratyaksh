"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, Star, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface WardScoreProps {
    wardName: string;
    score: number;
    rank: number;
}

export default function WardScorecard({ wardName, score, rank }: WardScoreProps) {
    const getGrade = (s: number) => {
        if (s >= 9) return { grade: "A+", color: "text-emerald-400", bg: "bg-emerald-400/10", glow: "shadow-[0_0_15px_rgba(52,211,153,0.3)]" };
        if (s >= 8) return { grade: "A", color: "text-sky-400", bg: "bg-sky-400/10", glow: "shadow-[0_0_15px_rgba(56,189,248,0.3)]" };
        if (s >= 7) return { grade: "B", color: "text-amber-400", bg: "bg-amber-400/10", glow: "shadow-[0_0_15px_rgba(251,191,36,0.3)]" };
        return { grade: "C", color: "text-rose-400", bg: "bg-rose-400/10", glow: "shadow-[0_0_15px_rgba(251,113,133,0.3)]" };
    };

    const { grade, color, bg, glow } = getGrade(score);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="glass-card p-8 flex flex-col gap-8 group hover:border-sky-500/40 transition-all duration-500 relative overflow-hidden"
        >
            {/* Dynamic Background Glow */}
            <div className={cn("absolute -top-12 -right-12 w-24 h-24 blur-[60px] opacity-20 rounded-full", bg)} />

            <div className="flex justify-between items-start relative z-10">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Verified Status</span>
                        <ShieldCheck size={12} className="text-sky-500 animate-pulse" />
                    </div>
                    <h2 className="text-2xl font-black tracking-tighter text-white group-hover:text-glow transition-all">{wardName}</h2>
                </div>
                <div className={cn("px-5 py-2 rounded-2xl font-black text-3xl", bg, color, glow)}>
                    {grade}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 relative z-10">
                <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Resolution Rate</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                        <span className="text-2xl font-black tracking-tight text-white">94.2%</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Avg Response</p>
                    <div className="flex items-center gap-2 text-sky-400">
                        <Clock size={18} />
                        <span className="text-2xl font-black tracking-tight text-glow">14.5h</span>
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-glass-border flex justify-between items-center text-xs relative z-10">
                <div className="flex items-center gap-2 text-amber-500/80">
                    <Star size={14} fill="currentColor" />
                    <span className="font-black text-white text-sm">4.8</span>
                    <span className="text-slate-500 font-bold uppercase tracking-tighter">(2.4k Trust Score)</span>
                </div>
                <div className="text-slate-500 font-black uppercase tracking-[0.2em] bg-white/5 px-2 py-1 rounded">
                    RANK #{rank}
                </div>
            </div>
        </motion.div>
    );
}
