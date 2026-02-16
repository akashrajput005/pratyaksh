"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SolarisLogo from "./SolarisLogo";
import {
    LayoutDashboard,
    Map as MapIcon,
    BarChart3,
    Users,
    Bell,
    Settings,
    ShieldCheck,
    BadgeCheck,
    Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
    { name: "Grid Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Spatial Matrix", href: "/map", icon: MapIcon },
    { name: "Social Intel", href: "/community", icon: Users },
    { name: "Rankings", href: "/rankings", icon: BarChart3 },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <nav className="fixed left-6 top-6 bottom-6 w-72 bento-tile flex flex-col p-8 z-[100] hidden lg:flex border-white/10">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-neon-violet/5 to-transparent z-[-1]" />

            {/* Brand Section */}
            <div className="mb-14 flex flex-col items-center text-center">
                <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="mb-6"
                >
                    <div className="p-4 bg-gradient-to-br from-neon-violet to-neon-pink rounded-[2rem] shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                        <SolarisLogo size="md" />
                    </div>
                </motion.div>
                <h2 className="text-3xl font-black text-white tracking-tightest leading-none italic">PRATYAKSH</h2>
                <span className="text-[10px] font-black text-neon-cyan uppercase tracking-[0.5em] block mt-3">Solaris Grid V3</span>
            </div>

            {/* Account Status - PERSISTENT & VIBRANT */}
            <div className="mb-10 p-8 rounded-[3rem] bg-white/5 border border-white/10 relative overflow-hidden group haptic-pulse cursor-pointer">
                <div className="absolute top-0 right-0 w-24 h-24 bg-neon-cyan/10 blur-3xl rounded-full" />
                <div className="flex items-center gap-3 mb-4">
                    <BadgeCheck size={18} className="text-neon-gold animate-pulse" />
                    <p className="text-[11px] font-black text-white uppercase tracking-widest">Protocol Active</p>
                </div>
                <p className="text-sm font-black text-neon-cyan truncate tracking-tighter">PRATYAKSH-USER-4291</p>
                <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-neon-emerald animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                        <span className="text-[10px] font-black text-neon-emerald uppercase tracking-widest">Verified</span>
                    </div>
                    <span className="text-[9px] font-black text-white/30 uppercase">ID: 4x9f</span>
                </div>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 space-y-2">
                <p className="px-6 text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-6">Uplink Layers</p>
                {sidebarLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-5 px-8 py-5 rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all group relative overflow-hidden haptic-pulse",
                                isActive
                                    ? "text-white bg-gradient-to-r from-neon-violet to-neon-cyan shadow-xl"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <Icon size={20} className={cn(
                                "transition-transform duration-500 z-10",
                                isActive ? "scale-110" : "group-hover:rotate-12"
                            )} />
                            <span className="relative z-10">{link.name}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Footer Nav */}
            <div className="pt-8 border-t border-white/5 space-y-2">
                {[
                    { name: "Alert Center", href: "/notifications", icon: Bell },
                    { name: "Settings Grid", href: "/settings", icon: Settings },
                ].map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "flex items-center gap-5 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all haptic-pulse",
                            pathname === link.href ? "text-neon-cyan bg-neon-cyan/10" : "text-white/30 hover:text-white"
                        )}
                    >
                        <link.icon size={18} />
                        {link.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
