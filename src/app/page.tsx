"use client";

import { motion } from "framer-motion";
import { PlusCircle, ShieldCheck, Map, Users, MessageSquare, Zap, BadgeCheck, Globe, ScanFace } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid";
import Link from "next/link";
import { useState, useEffect } from "react";
import IssueDrawer from "@/components/shared/IssueDrawer";
import { solarisEngine, GridMetrics } from "@/lib/solaris-engine";

export default function LandingPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [metrics, setMetrics] = useState<GridMetrics>(solarisEngine.getLiveMetrics());

    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(solarisEngine.getLiveMetrics());
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative space-y-32 py-20 overflow-hidden">
            {/* Hypersaturation Background Layer */}
            <div className="fixed inset-0 bg-mesh-vibrant opacity-10 blur-3xl z-[-1]" />

            <IssueDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            {/* Hero Section - High Energy */}
            <section className="relative flex flex-col items-center text-center space-y-12 px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="flex items-center gap-4 px-8 py-3 bg-neon-violet/10 border border-neon-violet/30 rounded-full backdrop-blur-md">
                        <Zap size={16} className="text-neon-gold fill-neon-gold animate-pulse" />
                        <span className="text-[10px] font-black text-neon-violet uppercase tracking-[0.4em]">Sol-Grid V3 Protocol Live</span>
                    </div>

                    <h2 className="text-2xl font-black text-cyan-400 tracking-[0.8em] uppercase italic opacity-60">PRATYAKSH</h2>
                </motion.div>

                <div className="space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-7xl md:text-[10rem] font-black tracking-tightest leading-[0.85] uppercase italic text-white"
                    >
                        UNFAKEABLE <br />
                        <span className="text-gradient-vibrant">TRUTH.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xs md:text-sm font-bold text-white/40 uppercase tracking-[0.5em] max-w-2xl mx-auto leading-loose"
                    >
                        The world's first hypersaturated accountability grid. <br />
                        Deploy forensic evidence. Demand civic integrity. Zero lag.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-6"
                >
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="h-24 px-12 button-vibrant shadow-[0_0_50px_rgba(139,92,246,0.3)] haptic-pulse flex items-center gap-6 text-sm"
                    >
                        DEPLOY PROOF <PlusCircle size={24} />
                    </button>
                    <Link href="/dashboard" className="h-24 px-12 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] flex items-center gap-6 hover:bg-white/10 transition-all haptic-pulse backdrop-blur-md text-sm">
                        ENTER GRID <Globe size={24} className="text-neon-cyan" />
                    </Link>
                    <Link href="/login" className="h-24 px-12 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-[2rem] font-black uppercase tracking-[0.3em] flex items-center gap-6 hover:bg-rose-500/20 transition-all haptic-pulse backdrop-blur-md text-sm">
                        LOGIN TO GRID <ScanFace size={24} />
                    </Link>
                </motion.div>

                {/* WhatsApp Community Pulse - FIXED POSITIONING */}
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute right-6 top-1/4 hidden xl:block"
                >
                    <button
                        onClick={() => window.open('https://chat.whatsapp.com/invite/example', '_blank')}
                        className="p-10 bg-[#25D366] text-white rounded-[3rem] shadow-[0_0_40px_rgba(37,211,102,0.4)] haptic-pulse flex flex-col items-center gap-4 border border-white/10"
                    >
                        <MessageSquare size={40} fill="white" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Connect Community</span>
                    </button>
                </motion.div>
            </section>

            {/* Feature Bento - Ultra Vibrant */}
            <BentoGrid>
                <BentoCard
                    className="md:col-span-2"
                    title="Forensic Optical Engine"
                    icon={<ScanFace className="text-neon-cyan" size={28} />}
                    badge="SYSTEM ALIGNED"
                    badgeColor="cyan"
                >
                    <div className="mt-12 space-y-8 w-full">
                        <p className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">
                            AI-BACKED <span className="text-neon-cyan">INTEGRITY.</span>
                        </p>
                        {/* Hypersaturation Metrics Ticker - LIVE */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl">
                            {[
                                { label: "Active Nodes", val: metrics.activeNodes.toLocaleString(), color: "neon-cyan" },
                                { label: "Reports Verified", val: metrics.verifiedReports.toLocaleString() + "+", color: "neon-emerald" },
                                { label: "Truth Score", val: metrics.truthScore.toFixed(1) + "%", color: "neon-gold" },
                                { label: "Response Velocity", val: metrics.responseVelocity, color: "neon-violet" }
                            ].map((stat) => (
                                <div key={stat.label} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl relative group overflow-hidden">
                                    <div className={`absolute inset-0 bg-${stat.color}/5 opacity-0 group-hover:opacity-100 transition-opacity`} />
                                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                                    <h3 className={`text-3xl font-black text-${stat.color} tracking-tighter italic`}>{stat.val}</h3>
                                </div>
                            ))}
                        </div>

                        {/* Truth Protocol Section */}
                        <div className="w-full max-w-6xl mt-24 p-12 rounded-[4rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-neon-pink/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
                                <div className="flex-1 space-y-6">
                                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">AIP-2026 Compliance</h2>
                                    <p className="text-sm font-bold text-white/40 uppercase tracking-widest leading-relaxed">
                                        Pratyaksh operates under the Transparency protocols of 2026. Every submission undergoes a three-tier AI forensic audit, ensuring that civic truth remains immutable and protected by the Solaris Grid.
                                    </p>
                                    <div className="flex gap-4">
                                        <div className="px-6 py-2 rounded-full border border-neon-gold/30 text-neon-gold text-[9px] font-black uppercase tracking-widest">Vision-AI Sync</div>
                                        <div className="px-6 py-2 rounded-full border border-neon-cyan/30 text-neon-cyan text-[9px] font-black uppercase tracking-widest">P2P Hash Verified</div>
                                    </div>
                                </div>
                                <div className="w-64 h-64 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center relative">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-4 border-t-2 border-neon-pink rounded-full"
                                    />
                                    <ShieldCheck size={80} className="text-white opacity-20 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-6 mt-12">
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex-1">
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Vision Sensor</p>
                                <div className="h-2 bg-neon-cyan/20 rounded-full overflow-hidden">
                                    <motion.div animate={{ width: "88%" }} className="h-full bg-neon-cyan" />
                                </div>
                            </div>
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex-1">
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">EXIF Audit</p>
                                <div className="h-2 bg-neon-gold/20 rounded-full overflow-hidden">
                                    <motion.div animate={{ width: "95%" }} className="h-full bg-neon-gold" />
                                </div>
                            </div>
                        </div>
                    </div>
                </BentoCard>

                <BentoCard
                    title="Spatial Privacy"
                    icon={<ShieldCheck className="text-neon-emerald" size={28} />}
                    badge="ENCRYPTED"
                    badgeColor="emerald"
                >
                    <div className="mt-12 h-64 w-full bg-gradient-to-br from-neon-emerald/20 to-transparent rounded-[3rem] border border-neon-emerald/20 flex items-center justify-center overflow-hidden relative group">
                        <div className="absolute inset-0 bg-mesh-vibrant opacity-10" />
                        <Map size={80} className="text-neon-emerald opacity-20 group-hover:scale-150 transition-transform duration-1000" />
                        <div className="absolute bottom-8 px-6 py-2 bg-neon-emerald text-white text-[9px] font-black uppercase tracking-widest rounded-full">GPS BLUR ACTIVE</div>
                    </div>
                </BentoCard>

                <BentoCard
                    title="WhatsApp Rapid"
                    icon={<MessageSquare className="text-[#25D366]" size={28} />}
                    badge="VITAL SYNC"
                    badgeColor="green"
                >
                    <div className="mt-10 space-y-6 w-full">
                        <p className="text-sm font-bold text-white/40 uppercase leading-relaxed tracking-wider">
                            Instant evidence distribution to local ward commanders via the encrypted Solaris WhatsApp Link.
                        </p>
                        <button
                            onClick={() => window.open('https://chat.whatsapp.com/invite/example', '_blank')}
                            className="w-full py-6 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] rounded-2xl font-black uppercase tracking-widest hover:bg-[#25D366]/20 transition-all text-[11px] haptic-pulse"
                        >
                            JOIN WARD-K COMMAND
                        </button>
                    </div>
                </BentoCard>

                <BentoCard
                    className="md:col-span-2"
                    title="Verified Social Intel"
                    icon={<Users className="text-neon-violet" size={28} />}
                    badge="LIVE STREAM"
                    badgeColor="violet"
                >
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
                        {[1, 2].map((i) => (
                            <div key={i} className="p-8 rounded-[3rem] bg-white/5 border border-white/10 space-y-6 group hover:translate-y-[-4px] transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-neon-violet to-neon-pink flex items-center justify-center text-white font-black text-xs shadow-lg">
                                        AS
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-black text-white uppercase">User_{i}429</p>
                                        <p className="text-[9px] font-black text-neon-gold uppercase mt-1">Verified Expert</p>
                                    </div>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full w-full" />
                                <p className="text-[10px] font-medium text-white/40 leading-relaxed uppercase tracking-widest">Logged high-integrity evidence in K-West Ward. Status: Under Review.</p>
                            </div>
                        ))}
                    </div>
                </BentoCard>
            </BentoGrid>
        </div>
    );
}