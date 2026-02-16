"use client";

import { useState, useEffect } from "react";
import { PlusCircle, MessageSquare, ShieldCheck, Settings as SettingsIcon, LogOut, BadgeCheck, Zap, ScanFace } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import IssueDrawer from "./IssueDrawer";
import Link from "next/link";

export default function GlobalHeader() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showWatermark, setShowWatermark] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowWatermark(false), 10000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const stored = localStorage.getItem('solaris_user');
        if (stored) {
            const data = JSON.parse(stored);
            if (data.name) setUserName(data.name);
            setIsLoggedIn(true);
        }

        // Sync rank with dashboard logic
        const fetchStats = async () => {
            const { getUserStats } = await import("@/lib/actions/issue.actions");
            const stats = await getUserStats("user_clerk_123");
            setUserRole(stats.trustLevel);
        };
        fetchStats();
    }, [isProfileOpen]);

    const [userRole, setUserRole] = useState("GUEST_LINK_PENDING");

    const handleSignOut = () => {
        localStorage.removeItem('solaris_user');
        window.location.href = '/login';
    };

    const user = {
        name: userName || "UNAUTHORIZED_GHOST",
        role: userRole,
        avatar: userName ? userName.split(' ').map(n => n[0]).join('').toUpperCase() : "??"
    };

    const pathname = usePathname();

    const getTitle = () => {
        const segment = pathname.split("/").pop();
        if (!segment || segment === "" || segment === "dashboard") return "SOL-GRID DOMINANCE";
        if (segment === "settings") return "SOL-CONFIG TERMINAL";
        return segment.charAt(0).toUpperCase() + segment.slice(1) + " GRID";
    };

    return (
        <>
            <AnimatePresence>
                {showWatermark && (
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] px-8 py-3 bg-cyan-500 text-black font-black text-xs uppercase tracking-[0.5em] rounded-full shadow-[0_0_50px_rgba(34,211,238,0.8)] border-4 border-white animate-pulse"
                    >
                        SOLARIS SUPREME SYNC V22.0 ACTIVE
                    </motion.div>
                )}
            </AnimatePresence>

            <IssueDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            <header className="fixed top-0 right-0 left-0 lg:left-80 h-32 z-[50] px-10 flex items-center justify-between pointer-events-none overflow-visible">
                <div className="flex items-center gap-8 pointer-events-auto">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="relative"
                    >
                        <h1 className="text-3xl font-black text-white tracking-tightest uppercase leading-none italic">
                            {getTitle()}
                        </h1>
                        <div className="absolute -bottom-3 left-0 w-24 h-1 bg-gradient-to-r from-neon-violet to-neon-cyan rounded-full" />
                        <p className="text-[10px] font-black text-neon-cyan uppercase tracking-[0.4em] mt-3 flex items-center gap-2">
                            <Zap size={12} className="text-neon-gold fill-neon-gold animate-pulse" />
                            Live Matrix Sync
                        </p>
                    </motion.div>
                </div>

                <div className="flex items-center gap-6 pointer-events-auto">
                    {!isLoggedIn ? (
                        <Link
                            href="/login"
                            className="h-14 px-8 bg-rose-500 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl flex items-center gap-3 shadow-xl haptic-pulse pointer-events-auto"
                        >
                            <ScanFace size={18} />
                            Citizen Login
                        </Link>
                    ) : (
                        <>
                            <Link
                                href="/dashboard"
                                className="h-14 px-8 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-black uppercase tracking-widest rounded-2xl flex items-center gap-3 shadow-xl haptic-pulse pointer-events-auto backdrop-blur-md"
                            >
                                <Zap size={18} />
                                Enter Grid
                            </Link>
                            {/* Pulsing WhatsApp Action */}
                            <motion.button
                                animate={{
                                    boxShadow: ["0 0 0px rgba(37, 211, 102, 0)", "0 0 20px rgba(37, 211, 102, 0.4)", "0 0 0px rgba(37, 211, 102, 0)"],
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                onClick={() => window.open('https://chat.whatsapp.com/invite/example', '_blank')}
                                className="h-14 px-8 bg-[#25D366] text-white text-[11px] font-black uppercase tracking-widest rounded-2xl flex items-center gap-3 shadow-xl haptic-pulse"
                            >
                                <MessageSquare size={18} fill="white" />
                                WA Community
                            </motion.button>

                            <button
                                onClick={() => setIsDrawerOpen(true)}
                                className="h-14 px-8 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)] haptic-pulse"
                            >
                                <PlusCircle size={18} />
                                Deploy Proof
                            </button>
                        </>
                    )}

                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="h-14 w-14 rounded-2xl bg-gradient-to-br from-neon-violet to-neon-pink p-[2px] haptic-pulse shadow-lg"
                        >
                            <div className="w-full h-full bg-[#020617] rounded-[calc(1rem-2px)] flex items-center justify-center text-white font-black text-sm">
                                {user.avatar}
                            </div>
                        </button>

                        <AnimatePresence>
                            {isProfileOpen && (
                                <>
                                    <div className="fixed inset-0 z-[-1]" onClick={() => setIsProfileOpen(false)} />
                                    <motion.div
                                        initial={{ opacity: 0, y: -40, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -40, scale: 0.9 }}
                                        className="absolute right-0 top-full mt-32 w-80 bento-tile p-8 shadow-[0_50px_120px_rgba(0,0,0,0.9)] z-[100] border-white/10 overflow-visible"
                                    >
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-5 border-b border-white/5 pb-8">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-neon-violet to-neon-cyan flex items-center justify-center text-white font-black text-lg">
                                                    {user.avatar}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-white uppercase truncate">{user.name}</p>
                                                    <div className="flex flex-col gap-1 mt-1">
                                                        <p className="text-[10px] font-black text-neon-gold uppercase tracking-widest flex items-center gap-1">
                                                            <BadgeCheck size={12} /> {user.role}
                                                        </p>
                                                        <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest animate-pulse">
                                                            SOLARIS V15.2 SYNCED
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Link href="/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 text-white/60 hover:text-white text-[11px] font-black uppercase tracking-widest transition-all group">
                                                    <SettingsIcon size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                                                    Settings Grid
                                                </Link>
                                                <button onClick={handleSignOut} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-neon-pink/10 text-neon-pink text-[11px] font-black uppercase tracking-widest transition-all group">
                                                    <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                                                    Disconnect
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </header>
        </>
    );
}
