"use client";

import { motion } from "framer-motion";
import { Users, Trophy, Activity, CheckCircle2, ShieldCheck, Flame } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid";

const LEADERBOARD = [
    { name: "Arjun S.", ward: "Ward 42", score: 98, reports: 145, badge: "Solaris Elite" },
    { name: "Priya K.", ward: "Ward 12", score: 94, reports: 122, badge: "Grid Guardian" },
    { name: "Rahul M.", ward: "Ward 42", score: 89, reports: 98, badge: "Verified Reporter" },
];

const RECENT_ACTIVITY = [
    { user: "Arjun S.", action: "Verified a Fix", target: "Main Street Pothole", time: "2m ago" },
    { user: "Deepa R.", action: "Reported Issue", target: "Water Leakage", time: "15m ago" },
    { user: "Ward 42 Inspector", action: "Resolved", target: "Street Light Out", time: "1h ago" },
];

export default function CommunityPage() {
    return (
        <div className="space-y-12">
            <header className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-sky-500/10 rounded-2xl border border-sky-500/20">
                        <Users className="text-sky-400" size={32} />
                    </div>
                    <div>
                        <h1 className="text-title">Community Grid</h1>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Social Accountability Hub • Phase 10</p>
                    </div>
                </div>
            </header>

            <BentoGrid>
                {/* Global Live Feed */}
                <BentoCard className="md:col-span-2" title="Live Activity Feed" icon={<Activity className="text-sky-400" />}>
                    <div className="space-y-4 mt-6">
                        {RECENT_ACTIVITY.map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center font-black text-[10px] text-sky-400">
                                        {item.user[0]}
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-white">{item.user} <span className="text-slate-500 font-bold ml-2">{item.action}</span></p>
                                        <p className="text-[10px] font-bold text-sky-400/60 uppercase tracking-tighter">{item.target}</p>
                                    </div>
                                </div>
                                <span className="text-[8px] font-black text-slate-600 uppercase">{item.time}</span>
                            </div>
                        ))}
                    </div>
                </BentoCard>

                {/* Top Reporters */}
                <BentoCard title="Ward Champions" icon={<Trophy className="text-amber-400" />}>
                    <div className="space-y-6 mt-6">
                        {LEADERBOARD.map((user, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="text-xl font-black text-slate-700 w-4">{i + 1}</div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs font-black text-white">{user.name}</p>
                                        <p className="text-[10px] font-black text-emerald-400">{user.score}% Integrity</p>
                                    </div>
                                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{user.badge}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </BentoCard>

                {/* Ward Impact */}
                <BentoCard title="Civic Impact" icon={<Flame className="text-rose-400" />}>
                    <div className="mt-6 space-y-2">
                        <p className="text-5xl font-black text-white tracking-tighter">84.2</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Aggragate Trust Index</p>
                        <div className="pt-4 flex gap-2">
                            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-rose-500 w-[84%]" />
                            </div>
                        </div>
                    </div>
                </BentoCard>

                {/* Security Status */}
                <BentoCard title="Grid Health" icon={<ShieldCheck className="text-emerald-400" />}>
                    <div className="mt-6 flex flex-col items-center justify-center text-center p-4">
                        <CheckCircle2 className="text-emerald-500 mb-2" size={32} />
                        <p className="text-xs font-black text-white uppercase">Forensics Operational</p>
                        <p className="text-[9px] font-bold text-slate-500 mt-1 italic">99.8% Spoofing Repelled</p>
                    </div>
                </BentoCard>
            </BentoGrid>
        </div>
    );
}
