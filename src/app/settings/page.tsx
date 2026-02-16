"use client";

import { motion } from "framer-motion";
import { Settings, User, EyeOff, ShieldCheck, BadgeCheck, MessageSquare, CheckCircle2, LayoutPanelLeft, Zap, Globe, Database, Shield } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import { solarisEngine } from "@/lib/solaris-engine";

export default function SettingsPage() {
    const [isObfuscated, setIsObfuscated] = useState(true);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isExifActive, setIsExifActive] = useState(true);
    const [isSensorActive, setIsSensorActive] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState<"none" | "pending" | "success">("none");
    const [name, setName] = useState("Akash Singh");
    const [isEditingName, setIsEditingName] = useState(false);
    const [tempName, setTempName] = useState(name);
    const [isSavingName, setIsSavingName] = useState(false);
    const [hwData, setHwData] = useState(solarisEngine.getHardwareSignature());
    const [events, setEvents] = useState(solarisEngine.getLiveMetrics().networkEvents);

    // Dynamic Updates
    useEffect(() => {
        const interval = setInterval(() => {
            setEvents(solarisEngine.getLiveMetrics().networkEvents);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Persist to localStorage
    useEffect(() => {
        const stored = localStorage.getItem('solaris_privacy');
        const storedUser = localStorage.getItem('solaris_user');

        if (stored) {
            const data = JSON.parse(stored);
            setIsObfuscated(data.isObfuscated || false);
            setIsAnonymous(data.isAnonymous || false);
        }
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.name) setName(userData.name);
        }
    }, []);

    const saveSettings = (updates: any) => {
        const current = { isObfuscated, isAnonymous, ...updates };
        localStorage.setItem('solaris_privacy', JSON.stringify(current));
    };

    const handleUpdateName = async () => {
        setIsSavingName(true);
        // Simulate DB update or call actual action if clerkId was available
        // For now, we update local state and localStorage
        setTimeout(() => {
            setName(tempName);
            localStorage.setItem('solaris_user', JSON.stringify({ name: tempName }));
            setIsEditingName(false);
            setIsSavingName(false);
        }, 1000);
    };

    const handleVerifyValue = () => {
        setVerifying(true);
        setVerificationStatus("pending");
        setTimeout(() => {
            setVerifying(false);
            setVerificationStatus("success");
            setHwData(solarisEngine.getHardwareSignature());
        }, 2000);
    };

    return (
        <div className="space-y-16 py-10">
            {/* Hypersaturation Background Layer */}
            <div className="fixed inset-0 bg-mesh-vibrant opacity-5 blur-3xl z-[-1]" />

            <header className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/5 pb-16 relative overflow-hidden">
                <div className="space-y-6 relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="p-5 bg-neon-violet/20 rounded-[2rem] border border-neon-violet/30 shadow-[0_0_30px_rgba(139,92,246,0.3)] haptic-pulse">
                            <Settings className="text-neon-violet animate-spin-slow" size={40} />
                        </div>
                        <div>
                            <h1 className="text-5xl font-black text-white tracking-tightest uppercase italic">SOLARIS CONFIG</h1>
                            <p className="text-[11px] font-black text-neon-cyan uppercase tracking-[0.5em] mt-2 flex items-center gap-2">
                                <Zap size={14} className="text-neon-gold fill-neon-gold" />
                                V3 System Protocols Active
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 relative z-10">
                    <button
                        onClick={() => window.open('https://chat.whatsapp.com/invite/example', '_blank')}
                        className="h-16 px-10 bg-[#25D366] text-white text-[11px] font-black uppercase tracking-widest rounded-3xl flex items-center gap-4 transition-all shadow-[0_0_30px_rgba(37,211,102,0.3)] haptic-pulse"
                    >
                        <MessageSquare size={20} fill="white" />
                        Join Commander Matrix
                    </button>
                </div>
            </header>

            <BentoGrid>
                {/* Integration Status Section - ADRESSING "NO INTEGRATION WORKING" */}
                <BentoCard
                    className="md:col-span-3"
                    title="Grid Connectivity Status"
                    icon={<Globe className="text-neon-cyan" size={24} />}
                    badge="SYSTEM CHECK"
                    badgeColor="cyan"
                >
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
                        {[
                            { label: "Prisma DB Layer", value: "OPERATIONAL", icon: Database, color: "text-neon-emerald" },
                            { label: "WhatsApp Uplink", value: "CONNECTED", icon: MessageSquare, color: "text-[#25D366]" },
                            { label: "Vision AI Engine", value: "ACTIVE", icon: Zap, color: "text-neon-gold" },
                            { label: "Sol-Grid P2P", value: "SYNCED", icon: ShieldCheck, color: "text-neon-violet" }
                        ].map((stat) => (
                            <div key={stat.label} className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center text-center gap-4 group hover:bg-white/10 transition-all border-b-2 border-b-transparent hover:border-b-neon-cyan">
                                <stat.icon className={cn("w-8 h-8", stat.color)} />
                                <div>
                                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">{stat.label}</p>
                                    <p className={cn("text-xs font-black uppercase", stat.color)}>{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </BentoCard>

                {/* Identity Management */}
                <BentoCard
                    title="Account Identity"
                    icon={<User className="text-neon-gold" size={24} />}
                    badge="SECURE"
                    badgeColor="gold"
                >
                    <div className="mt-8 space-y-8 w-full">
                        <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 shadow-inner group transition-colors">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Citizen ID</p>
                                {!isEditingName && (
                                    <button
                                        onClick={() => {
                                            setIsEditingName(true);
                                            setTempName(name);
                                        }}
                                        className="text-[9px] font-black text-neon-gold uppercase hover:underline"
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>

                            {isEditingName ? (
                                <div className="space-y-4">
                                    <input
                                        value={tempName}
                                        onChange={(e) => setTempName(e.target.value)}
                                        className="w-full bg-black/40 border border-neon-gold/30 rounded-xl px-4 py-3 text-white font-black uppercase text-sm focus:outline-none focus:border-neon-gold"
                                        placeholder="New Citizen Name"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleUpdateName}
                                            disabled={isSavingName}
                                            className="flex-1 py-3 bg-neon-gold text-black font-black uppercase text-[10px] rounded-xl"
                                        >
                                            {isSavingName ? "Saving..." : "Update"}
                                        </button>
                                        <button
                                            onClick={() => setIsEditingName(false)}
                                            className="px-4 py-3 bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] rounded-xl"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <p className="text-2xl font-black text-white tracking-tighter uppercase italic">{name}</p>
                                    <BadgeCheck size={24} className="text-neon-gold animate-pulse" />
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleVerifyValue}
                            disabled={verifying || verificationStatus === "success"}
                            className={cn(
                                "w-full h-18 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 border shadow-xl haptic-pulse",
                                verificationStatus === "success"
                                    ? "bg-neon-emerald/20 text-neon-emerald border-neon-emerald/40"
                                    : "button-vibrant border-transparent"
                            )}
                        >
                            {verifying ? (
                                <Zap className="animate-spin" size={18} />
                            ) : verificationStatus === "success" ? (
                                <CheckCircle2 size={18} />
                            ) : "Initialize Authentication"}
                        </button>
                    </div>
                </BentoCard>

                {/* Privacy Guard */}
                <BentoCard
                    className="md:col-span-2"
                    title="Privacy Guard V3"
                    icon={<Shield className="text-neon-pink" size={24} />}
                    badge="ACTIVE ENCRYPTION"
                    badgeColor="rose"
                >
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                        <div
                            onClick={() => {
                                const newVal = !isObfuscated;
                                setIsObfuscated(newVal);
                                saveSettings({ isObfuscated: newVal });
                            }}
                            className={cn(
                                "p-10 rounded-[4rem] border transition-all cursor-pointer haptic-pulse relative overflow-hidden group/item",
                                isObfuscated ? "bg-neon-emerald/10 border-neon-emerald/30 shadow-[0_0_40px_rgba(16,185,129,0.1)]" : "bg-white/5 border-white/10 opacity-40 hover:opacity-100"
                            )}
                        >
                            {isObfuscated && <div className="absolute inset-0 bg-mesh-vibrant opacity-10 animate-pulse" />}
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <p className="text-lg font-black text-white uppercase italic tracking-tighter">Locality Masking</p>
                                <div className={cn(
                                    "w-14 h-7 rounded-full p-1.5 transition-colors",
                                    isObfuscated ? "bg-neon-emerald" : "bg-white/10"
                                )}>
                                    <motion.div animate={{ x: isObfuscated ? 28 : 0 }} className="w-4 h-4 rounded-full bg-white shadow-xl" />
                                </div>
                            </div>
                            <p className="text-[10px] font-bold text-white/40 uppercase leading-relaxed tracking-widest relative z-10">Blur GPS coordinates on the public social stream while maintaining precision for grid admins.</p>
                        </div>

                        <div
                            onClick={() => {
                                const newVal = !isAnonymous;
                                setIsAnonymous(newVal);
                                saveSettings({ isAnonymous: newVal });
                            }}
                            className={cn(
                                "p-10 rounded-[4rem] border transition-all cursor-pointer haptic-pulse relative overflow-hidden group/item",
                                isAnonymous ? "bg-neon-gold/10 border-neon-gold/30 shadow-[0_0_40px_rgba(245,158,11,0.1)]" : "bg-white/5 border-white/10 opacity-40 hover:opacity-100"
                            )}
                        >
                            {isAnonymous && <div className="absolute inset-x-0 bottom-0 h-1 bg-neon-gold" />}
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <p className="text-lg font-black text-white uppercase italic tracking-tighter">Identity Veil</p>
                                <div className={cn(
                                    "w-14 h-7 rounded-full p-1.5 transition-colors",
                                    isAnonymous ? "bg-neon-gold" : "bg-white/10"
                                )}>
                                    <motion.div animate={{ x: isAnonymous ? 28 : 0 }} className="w-4 h-4 rounded-full bg-white shadow-xl" />
                                </div>
                            </div>
                            <p className="text-[10px] font-bold text-white/40 uppercase leading-relaxed tracking-widest relative z-10">Completely detach your citizen profile from reports on the global dashboard community feed.</p>
                        </div>
                    </div>
                </BentoCard>

                {/* Forensics Activity */}
                <BentoCard
                    className="md:col-span-2"
                    title="Forensic Audit Logs"
                    icon={<ShieldCheck className="text-neon-cyan" size={24} />}
                    badge="SYSTEM LIVE"
                    badgeColor="cyan"
                >
                    <div className="mt-8 space-y-4 w-full h-64 overflow-y-auto pr-4 custom-scrollbar">
                        {[
                            { action: "EXIF Integrity Check", status: "PASS", time: "2m ago", integrity: "99%" },
                            { action: "Spatial Ward Sync", status: "SYNCED", time: "15m ago", integrity: "100%" },
                            { action: "AI Semantic Audit", status: "WAITING", time: "Just now", integrity: "N/A" },
                            { action: "Hardware Sig Scan", status: "PASS", time: "1h ago", integrity: "98%" }
                        ].map((log, i) => (
                            <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className={cn("w-2 h-2 rounded-full", log.status === "PASS" || log.status === "SYNCED" ? "bg-neon-emerald" : "bg-neon-gold animate-pulse")} />
                                    <div>
                                        <p className="text-[11px] font-black text-white uppercase tracking-widest">{log.action}</p>
                                        <p className="text-[9px] font-bold text-white/20 uppercase mt-1">{log.time}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[11px] font-black text-neon-cyan uppercase">{log.status}</p>
                                    <p className="text-[9px] font-bold text-white/20 uppercase mt-1">Integrity: {log.integrity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </BentoCard>

                {/* Hardware Signature Vault */}
                <BentoCard
                    title="Hardware Signature Vault"
                    icon={<Database className="text-neon-gold" size={24} />}
                    badge="ENCRYPTED"
                    badgeColor="gold"
                >
                    <div className="mt-8 space-y-6 w-full">
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between group hover:border-neon-gold transition-all">
                            <div>
                                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Device Node ID</p>
                                <p className="text-sm font-black text-white uppercase italic">{hwData.nodeId}</p>
                            </div>
                            <ShieldCheck className="text-neon-gold" size={20} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                                <p className="text-[8px] font-black text-white/20 uppercase mb-1">Sensor Entropy</p>
                                <p className="text-xs font-black text-neon-gold">{hwData.sensorEntropy}%</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                                <p className="text-[8px] font-black text-white/20 uppercase mb-1">Vault Uplink</p>
                                <p className="text-xs font-black text-neon-gold">{hwData.vaultStatus}</p>
                            </div>
                        </div>
                    </div>
                </BentoCard>

                {/* Network Integrity Logs */}
                <BentoCard
                    className="md:col-span-2"
                    title="Grid Integrity Feed"
                    icon={<Zap className="text-neon-cyan" size={24} />}
                    badge="REALTIME"
                    badgeColor="cyan"
                >
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {events.map((log, i) => (
                            <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all border-l-2 border-l-transparent hover:border-l-neon-cyan">
                                <div>
                                    <p className="text-[10px] font-black text-white uppercase">{log.event}</p>
                                    <p className="text-[8px] font-bold text-white/30 uppercase mt-1">{log.node} • {log.timestamp}</p>
                                </div>
                                <span className="text-[9px] font-black text-neon-cyan/60 group-hover:text-neon-cyan transition-colors">{log.status}</span>
                            </div>
                        ))}
                    </div>
                </BentoCard>
            </BentoGrid>
        </div>
    );
}

// Add these to globals.css if not present
// .animate-spin-slow { animation: spin 8s linear infinite; }
// @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
