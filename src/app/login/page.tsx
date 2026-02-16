"use client";

import Link from "next/link";
import { ShieldCheck, ArrowRight, Lock, Mail, Heart } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SolarisLogo from "@/components/shared/SolarisLogo";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Persistent Session Uplink
        localStorage.setItem('solaris_user', JSON.stringify({
            name: "Akash Sharma",
            role: "Solaris Pro",
            id: "user_sol_777"
        }));

        setTimeout(() => {
            router.push("/dashboard");
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a0118] relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-10 glass-card border-white/10 rounded-[2.5rem] relative z-10 shadow-2xl"
            >
                <div className="flex flex-col items-center text-center mb-10">
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                    >
                        <SolarisLogo size="xl" />
                    </motion.div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase whitespace-nowrap text-glow-premium mt-6">Solaris Amore</h1>
                    <p className="text-[10px] font-bold text-rose-400/60 uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
                        <Heart size={10} fill="currentColor" />
                        Verified Accountability Portal
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                required
                                type="email"
                                placeholder="Citizen ID / Email"
                                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-xs font-bold text-white outline-none focus:border-rose-500 transition-all"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                required
                                type="password"
                                placeholder="Access Key"
                                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-xs font-bold text-white outline-none focus:border-rose-500 transition-all"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 bg-rose-500 hover:bg-rose-400 text-white font-black rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 tracking-widest text-xs uppercase cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(244,63,94,0.3)]"
                    >
                        {loading ? "Authenticating Flow..." : "Enter Amore Grid"}
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center gap-4 text-center">
                    <Link href="/" className="text-[10px] font-black text-rose-400/80 hover:text-rose-300 uppercase hover:underline tracking-widest">
                        Return to Public Grid
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
