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
    const [userRole, setUserRole] = useState("GUEST_LINK_PENDING");

    const pathname = usePathname();

    useEffect(() => {
        const syncSession = async () => {
            const stored = localStorage.getItem('solaris_user');
            if (stored) {
                try {
                    const data = JSON.parse(stored);
                    if (data.name) setUserName(data.name);
                    setIsLoggedIn(true);

                    // Sync stats with the actual ID
                    const { getUserStats } = await import("@/lib/actions/issue.actions");
                    const stats = await getUserStats(data.id || "user_clerk_123");
                    setUserRole(stats.trustLevel);
                } catch (e) {
                    console.error("Session Sync Failed", e);
                }
            }
        };
        syncSession();
    }, [pathname]);

    const handleSignOut = () => {
        localStorage.removeItem('solaris_user');
        window.location.href = '/login';
    };

    const user = {
        name: userName || "UNAUTHORIZED_GHOST",
        role: userRole,
        avatar: userName ? userName.split(' ').map(n => n[0]).join('').toUpperCase() : "??"
    };

    const getTitle = () => {
        const segment = pathname.split("/").pop();
        if (!segment || segment === "" || segment === "dashboard") return "SOL-GRID DOMINANCE";
        if (segment === "settings") return "SOL-CONFIG TERMINAL";
        return segment.charAt(0).toUpperCase() + segment.slice(1) + " GRID";
    };

    return (
        <>
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
                                                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-neon-violet to-neon-pink p-[2px]">
                                                            <div className="w-full h-full bg-[#020617] rounded-[calc(1rem-3px)] flex items-center justify-center text-xl font-black text-white">
                                                                {user.avatar}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h3 className="font-black text-white text-lg tracking-tight uppercase italic">{user.name}</h3>
                                                            <p className="text-[10px] font-black text-neon-cyan uppercase tracking-widest flex items-center gap-2 mt-1">
                                                                <BadgeCheck size={12} />
                                                                {user.role}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <button className="w-full h-14 px-6 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-[11px] font-black uppercase tracking-widest flex items-center justify-between transition-all group overflow-hidden relative">
                                                            <div className="flex items-center gap-4">
                                                                <SettingsIcon size={18} className="text-white/40 group-hover:text-white transition-colors" />
                                                                <span>Grid Preferences</span>
                                                            </div>
                                                            <div className="absolute right-0 w-1 h-0 bg-neon-cyan group-hover:h-full transition-all duration-500" />
                                                        </button>

                                                        <button
                                                            onClick={handleSignOut}
                                                            className="w-full h-14 px-6 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-[11px] font-black uppercase tracking-widest flex items-center justify-between transition-all group overflow-hidden relative"
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <LogOut size={18} />
                                                                <span>Sever Uplink</span>
                                                            </div>
                                                            <div className="absolute right-0 w-1 h-0 bg-rose-500 group-hover:h-full transition-all duration-500" />
                                                        </button>
                                                    </div>

                                                    <div className="pt-4 border-t border-white/5">
                                                        <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest animate-pulse">
                                                            SOLARIS V22.2 SYNCED
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        </>
                    )}
                </div>
            </header>
        </>
    );
}
