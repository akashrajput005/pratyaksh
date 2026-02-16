"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, CheckCircle2, Loader2, Info } from "lucide-react";
import { verifyResolution } from "@/lib/actions/issue.actions";

export default function FixVerification({ issueId }: { issueId: string }) {
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);

    const handleVerify = async () => {
        setLoading(true);
        const result = await verifyResolution(issueId, "https://example.com/fix.jpg");
        setLoading(false);
        if (result.success) {
            setVerified(true);
        }
    };

    return (
        <div className="glass-card p-6 border-sky-500/20 bg-sky-500/5">
            <div className="flex items-start gap-4 mb-6">
                <div className="p-2 bg-sky-500/20 rounded-lg text-sky-400">
                    <Info size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-lg">Proof of Resolution Required</h3>
                    <p className="text-sm text-slate-400">Official marked this as 'Fixed'. Upload an 'After' photo to confirm.</p>
                </div>
            </div>

            {verified ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 text-emerald-400 font-bold bg-emerald-400/10 p-3 rounded-xl border border-emerald-400/20"
                >
                    <CheckCircle2 size={20} />
                    RESOLUTION VERIFIED BY COMMUNITY
                </motion.div>
            ) : (
                <div className="space-y-4">
                    <div className="aspect-video glass-card border-dashed border-sky-500/30 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:bg-sky-500/10 transition-all">
                        <Camera className="text-sky-500/50 group-hover:text-sky-400 transition-colors" size={32} />
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Upload After Photo</p>
                    </div>

                    <button
                        onClick={handleVerify}
                        disabled={loading}
                        className="w-full h-12 bg-sky-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-sky-400 transition-all shadow-lg"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                AI SEMANTIC MATCHING...
                            </>
                        ) : (
                            "VERIFY & CLOSE GRID GAP"
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
