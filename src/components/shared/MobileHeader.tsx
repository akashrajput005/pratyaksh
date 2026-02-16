"use client";

import { ShieldCheck, Menu, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function MobileHeader({ onReportClick }: { onReportClick: () => void }) {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 glass-card rounded-none border-t-0 border-x-0 border-b border-glass-border flex items-center justify-between px-6 z-50 md:hidden bg-slate-950/50">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.5)]">
                    <ShieldCheck className="text-white w-5 h-5" />
                </div>
                <span className="text-lg font-black tracking-tighter text-white">PRATYAKSH</span>
            </div>

            <div className="flex items-center gap-4">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onReportClick}
                    className="p-2 bg-sky-500 rounded-full text-white shadow-lg shadow-sky-500/20"
                >
                    <PlusCircle size={20} />
                </motion.button>
                <button className="p-2 text-slate-400">
                    <Menu size={24} />
                </button>
            </div>
        </header>
    );
}
