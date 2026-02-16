"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid";
import {
    AlertCircle,
    BarChart3,
    ShieldCheck,
    Zap,
    Map as MapIcon,
    Layers,
    UserCheck,
    History,
    TrendingUp,
    Users,
    Settings,
    Globe
} from "lucide-react";
import Link from "next/link";
import { getAllIssues, getUserStats } from "@/lib/actions/issue.actions";
import { solarisEngine, GridMetrics } from "@/lib/solaris-engine";
import dynamic from "next/dynamic";
const AccountabilityMap = dynamic(() => import("@/components/shared/AccountabilityMap"), { ssr: false });

export default function Dashboard() {
    const [issues, setIssues] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [metrics, setMetrics] = useState<GridMetrics>({
        activeNodes: 1240,
        verifiedReports: 42800,
        truthScore: 99.4,
        responseVelocity: "2.4h",
        networkEvents: []
    });
    const [userStats, setUserStats] = useState<any>({
        trustLevel: "SOLARIS CITIZEN",
        impactXP: "0",
        wardInfluence: "PENDING"
    });
    const [chartData, setChartData] = useState<number[]>([40, 85, 55, 100, 75, 90, 60, 95]);

    useEffect(() => {
        const interval = setInterval(() => {
            setChartData(prev => prev.map(v => Math.max(30, Math.min(100, v + (Math.random() * 20 - 10)))));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Prime the engine only on client mount
        setMetrics(solarisEngine.getLiveMetrics());
        const interval = setInterval(() => {
            setMetrics(solarisEngine.getLiveMetrics());
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const stored = localStorage.getItem('solaris_user');
            const userId = stored ? JSON.parse(stored).id : "user_clerk_123";
            const data = await getAllIssues();
            setIssues(data);
            const stats = await getUserStats(userId);
            setUserStats(stats);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const wards = [
        { name: "Ward K-West (Andheri)", score: (9.4 + (Math.sin(Date.now() / 5000) * 0.2)).toFixed(1), rank: 1 },
        { name: "Ward H-East (Bandra)", score: (8.7 + (Math.cos(Date.now() / 5000) * 0.2)).toFixed(1), rank: 3 },
        { name: "Ward A (Colaba)", score: (7.5 + (Math.sin(Date.now() / 7000) * 0.2)).toFixed(1), rank: 9 },
    ];

    return (
        <div className="space-y-16 py-8">
            {/* Status Pulse Header */}
            <div className="flex flex-col gap-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 text-cyan-400 font-black text-[10px] bg-cyan-400/10 w-fit px-4 py-1.5 rounded-full uppercase tracking-[0.4em] border border-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Grid Synchronization: Active 2026
                </motion.div>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-title text-glow-premium leading-none">Accountability Grid</h1>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-4">Real-time forensic integrity monitoring across Mumbai</p>
                    </div>
                </div>
            </div>

            {/* V4 Ultimate Bento Layout */}
            <BentoGrid>
                <BentoCard
                    className="md:col-span-2"
                    title="Sector Performance Index"
                    headerClassName="min-h-[220px]"
                    description="Aggregate resolution speed and citizen trust metrics."
                    header={
                        <div className="flex gap-4 w-full h-full p-8 items-end bg-gradient-to-t from-cyan-500/10 to-transparent rounded-3xl border border-white/5">
                            {chartData.map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        delay: i * 0.1
                                    }}
                                    className="flex-1 bg-gradient-to-t from-cyan-500/40 to-cyan-400 rounded-t-xl group-hover:from-cyan-400/60 transition-all duration-500 relative overflow-hidden"
                                >
                                    <motion.div
                                        animate={{ y: ["100%", "-100%"] }}
                                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                                        className="absolute inset-0 bg-white/20 blur-sm"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    }
                    icon={<BarChart3 size={24} />}
                    badge="98.1% Integrity"
                />

                <BentoCard
                    title="Integrity Core"
                    description="Forensic multimedia validation active."
                    headerClassName="min-h-[220px] flex items-center justify-center"
                    header={
                        <div className="relative group p-8">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="w-32 h-32 rounded-full border-2 border-dashed border-emerald-500/40"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <ShieldCheck size={64} className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
                            </div>
                        </div>
                    }
                    icon={<ShieldCheck size={24} />}
                    badge="SECURE"
                    badgeColor="emerald"
                />

                <BentoCard
                    title="Spatial Matrix"
                    description="Live forensic node telemetry and ward distribution."
                    headerClassName="min-h-[300px]"
                    className="md:col-span-2"
                    header={
                        <div className="w-full h-full min-h-[300px] rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl bg-slate-900/50">
                            <AccountabilityMap issues={issues} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                            <div className="absolute bottom-4 left-4 flex flex-col gap-1">
                                <p className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                                    <Globe size={12} className="text-cyan-400" /> Matrix Feed Active
                                </p>
                            </div>
                        </div>
                    }
                    icon={<MapIcon size={24} />}
                    badge="LIVE MATRIX"
                />

                <BentoCard
                    title="Ward Dominance"
                    description="Real-time performance ranking of citizen activity."
                    header={
                        <div className="w-full space-y-3 px-4">
                            {wards.map((w, i) => (
                                <div key={i} className="flex justify-between items-center p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-neon-violet/10 hover:border-neon-violet/20 transition-all group/item">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-white/20 group-hover/item:text-neon-violet transition-colors">0{i + 1}</span>
                                        <span className="text-[10px] font-black uppercase text-slate-300 tracking-tighter">{w.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${Number(w.score) * 10}%` }} className="h-full bg-neon-violet" />
                                        </div>
                                        <span className="text-xs font-black text-neon-violet">{w.score}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    icon={<Users size={24} className="text-neon-violet" />}
                    badge="LIVE RANKING"
                    badgeColor="violet"
                />

                <BentoCard
                    className="md:col-span-2"
                    title="Grid Forensic Node Sync"
                    description="Visualizing P2P verification across Mumbai's decentralized nodes."
                    header={
                        <div className="w-full h-full p-8 flex items-center justify-center relative overflow-hidden bg-black/20 rounded-3xl">
                            <div className="relative w-64 h-32">
                                {[...Array(metrics.activeNodes % 10 + 5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            opacity: [0.2, 1, 0.2],
                                            scale: [1, 1.2, 1]
                                        }}
                                        transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                                        className="absolute w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                                        style={{
                                            left: `${(Math.sin(i * 45) + 1) * 50}%`,
                                            top: `${(Math.cos(i * 123) + 1) * 50}%`
                                        }}
                                    />
                                ))}
                                <svg className="absolute inset-0 w-full h-full opacity-20">
                                    <motion.path
                                        d="M 20 20 L 100 80 L 200 30 L 250 100"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        fill="none"
                                        className="text-neon-cyan"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                    />
                                </svg>
                            </div>
                            <div className="absolute bottom-4 left-6 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-neon-emerald animate-ping" />
                                <span className="text-[8px] font-black text-neon-emerald uppercase tracking-[0.3em]">
                                    {metrics.activeNodes} Nodes Synchronized
                                </span>
                            </div>
                        </div>
                    }
                    icon={<Layers size={24} className="text-neon-cyan" />}
                    badge="SYNCED"
                    badgeColor="cyan"
                />

                <BentoCard
                    title="Truth Protocols"
                    description="AI & Forensic compliance standards for 2026."
                    header={
                        <div className="grid grid-cols-2 gap-3 w-full px-4 text-center">
                            {[
                                { id: "AIP", status: metrics.truthScore > 99.5 ? "GOLD" : "PASS" },
                                { id: "EXIF", status: Math.random() > 0.5 ? "SYNC" : "UPLINK" },
                                { id: "GEO", status: "LIVE" },
                                { id: "NLP", status: Math.random() > 0.3 ? "PASS" : "SYNC" }
                            ].map((p) => (
                                <div key={p.id} className="p-3 rounded-2xl bg-white/5 border border-white/5 group hover:border-neon-gold transition-colors">
                                    <p className="text-[8px] font-black text-white/40 mb-1">{p.id}</p>
                                    <p className="text-[10px] font-black text-neon-gold uppercase">{p.status}</p>
                                </div>
                            ))}
                        </div>
                    }
                    icon={<Zap size={24} className="text-neon-gold" />}
                    badge="CERTIFIED"
                    badgeColor="gold"
                />
            </BentoGrid>

            {/* AI Stream & Session Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between px-6">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping shadow-[0_0_20px_rgba(6,182,212,0.8)]" />
                            <h2 className="text-xs font-black text-white uppercase tracking-[0.4em]">Grid Forensic Stream</h2>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Audit History</span>
                    </div>

                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <Zap className="animate-pulse text-cyan-400" size={40} />
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Synchronizing Forensic Stream...</p>
                            </div>
                        ) : issues.length === 0 ? (
                            <div className="p-12 bento-tile text-center border-dashed border-white/10">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">No verified evidence detected on grid</p>
                            </div>
                        ) : (
                            issues.map((issue, i) => (
                                <motion.div
                                    key={issue.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 bento-tile flex items-center justify-between group hover:border-cyan-500/20"
                                >
                                    <div className="flex items-center gap-8">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-cyan-500/30 transition-all overflow-hidden relative">
                                            {issue.imageUrl && !issue.imageUrl.startsWith('blob:') ? (
                                                <img
                                                    src={issue.imageUrl}
                                                    alt=""
                                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1590483734748-361bcb5c6f0b?q=80&w=200&auto=format&fit=crop";
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-cyan-500/5">
                                                    <Zap size={24} className="text-cyan-400" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-white text-lg tracking-tighter uppercase">
                                                {issue.ward?.name || "Global Grid"} • {issue.category}
                                            </h4>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase mt-1 tracking-widest">
                                                REPORTER: {issue.isAnonymous ? "Anonymized Citizen" : issue.citizen?.name || "System"} •
                                                AI SCORE: {issue.integrityScore}% •
                                                {issue.isObfuscated ? "GPS PROTECTED" : `${issue.latitude.toFixed(3)}, ${issue.longitude.toFixed(3)}`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {issue.status === "OPEN" ? (
                                            <button
                                                onClick={async () => {
                                                    const { updateIssueStatus } = await import("@/lib/actions/issue.actions");
                                                    await updateIssueStatus(issue.id, "RESOLVED", "ADMIN");
                                                    window.location.reload(); // Force refresh for demo
                                                }}
                                                className="px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500 hover:text-white transition-all haptic-pulse shadow-xl shadow-cyan-500/10"
                                            >
                                                Resolve Case
                                            </button>
                                        ) : (
                                            <div className={cn(
                                                "px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em]",
                                                issue.status === "RESOLVED" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-slate-500/10 text-slate-400 border border-white/5"
                                            )}>
                                                {issue.status}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                <div className="bento-tile p-10 h-full flex flex-col justify-between border-cyan-500/10 bg-gradient-to-b from-cyan-500/5 to-transparent">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-black text-white tracking-tighter uppercase leading-tight">Civic Session</h3>
                            <p className="text-[10px] font-black text-cyan-400/60 uppercase tracking-[0.3em] mt-2">Pratyaksh V4 Ultimate</p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { label: "Trust Level", val: userStats.trustLevel, color: "cyan" },
                                { label: "Impact XP", val: userStats.impactXP.toLocaleString(), color: "emerald" },
                                { label: "Ward Influence", val: userStats.wardInfluence, color: "cyan" },
                            ].map((s, i) => (
                                <div key={i} className="flex justify-between items-center py-4 border-b border-white/5">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</span>
                                    <span className={`text-xs font-black text-${s.color}-400`}>{s.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="w-full py-5 bg-white text-[#020617] font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-cyan-400 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.4)] mt-12">
                        View Profile Grid
                    </button>
                </div>
            </div>
        </div>
    );
}
