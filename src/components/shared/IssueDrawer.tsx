"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, MapPin, Loader2, CheckCircle2, MessageSquare, ShieldCheck, ShieldAlert, BadgeCheck, AlertTriangle, RefreshCw } from "lucide-react";
import { createIssue } from "@/lib/actions/issue.actions";
import VoiceReporter from "./VoiceReporter";
import { cn } from "@/lib/utils";
import { analyzeEvidence, calculateIntegrity, IntegrityScore } from "@/lib/forensics/exif-guard";
import { analyzeImage } from "@/lib/ai/vision-system";

interface IssueDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function IssueDrawer({ isOpen, onClose }: IssueDrawerProps) {
    const [tab, setTab] = useState<"visual" | "voice">("visual");
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [integrity, setIntegrity] = useState<IntegrityScore | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [audit, setAudit] = useState<any>(null);
    const [voiceStatus, setVoiceStatus] = useState<"idle" | "recording" | "error" | "processing">("idle");

    // Privacy Infrastructure
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isObfuscated, setIsObfuscated] = useState(true);

    const detectLocation = () => {
        setLocationError(null);

        if (typeof window === "undefined" || !navigator.geolocation) {
            setLocationError("Geolocation not supported by this browser.");
            return;
        }

        const options: PositionOptions = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                setLocationError(null);
            },
            (err) => {
                // Safeguard against null/undefined error objects which can crash the app
                const errMsg = err?.message || "Geolocation protocol: ACCESS_DENIED or TIMEOUT";
                setLocationError(errMsg);

                // Fallback to a default ward location for demo purposes if real GPS fails
                // Using a central Mumbai coordinate as the fail-safe node
                setLocation({ lat: 19.1136, lng: 72.8697 });
            },
            options
        );
    };

    useEffect(() => {
        if (isOpen) {
            const stored = localStorage.getItem('solaris_privacy');
            if (stored) {
                const data = JSON.parse(stored);
                setIsAnonymous(data.isAnonymous);
                setIsObfuscated(data.isObfuscated);
            }
            detectLocation();
        } else {
            setTab("visual");
            setSuccess(false);
            setLoading(false);
            setIntegrity(null);
            setFile(null);
            setPreview(null);
            setAudit(null);
            setLocationError(null);
        }
    }, [isOpen]);

    const handleAnalyzeEvidence = async (targetFile: File) => {
        const forensics = await analyzeEvidence(targetFile);
        // Set integrity even if location is pending to show photo geotag status
        const dummyLocation = location || { lat: 0, lng: 0 };
        const finalIntegrity = calculateIntegrity(forensics, dummyLocation);
        setIntegrity(finalIntegrity);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        // Reset analysis states for new evidence
        setAudit(null);
        setIntegrity(null);

        setFile(selectedFile);
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        handleAnalyzeEvidence(selectedFile);
    };

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let finalAudit = audit;
            if (file && location && !audit) {
                const visionResult = await analyzeImage(file);
                finalAudit = visionResult;
                setAudit(visionResult);
            }

            let base64Image = preview;
            if (file) {
                base64Image = await fileToBase64(file);
            }

            // Sync Delay for UX Stability (Matrix Uplink Simulation)
            await new Promise(resolve => setTimeout(resolve, 3000));

            const result = await createIssue({
                title: finalAudit?.detectedIssues[0] || "Civic Issue",
                description: finalAudit?.description || "Evidence captured via Solaris Hypersaturated Grid.",
                category: finalAudit?.detectedIssues[0] || "General",
                latitude: location?.lat || 0,
                longitude: location?.lng || 0,
                imageUrl: base64Image || "",
                userId: isAnonymous ? "anonymous_agent" : "user_clerk_123",
                isAnonymous,
                isObfuscated,
                integrityScore: integrity?.score || 0,
                integrityBadge: integrity?.badge || "UNVERIFIED"
            });

            if (result.success) {
                setSuccess(true);
                // WhatsApp Integration - Vibrant Message
                const shareMsg = `🚀 [SOLARIS VERIFIED] I've just deployed critical civic evidence to the Pratyaksh Grid! 📍 Ward: ${isObfuscated ? "K-West (Protected)" : "Active Hub"}. Integrity: ${integrity?.badge} (${integrity?.score}%). Check the live grid!`;

                setTimeout(() => {
                    onClose();
                    // Full Matrix State Reset
                    setTimeout(() => {
                        setFile(null);
                        setPreview(null);
                        setSuccess(false);
                        setAudit(null);
                        setIntegrity(null);
                    }, 500);
                }, 1500);
            }
        } catch (error) {
            // Matrix Connection Fail-safe
        } finally {
            setLoading(false);
        }
    };

    // Forensic Synchronization: Re-trigger analysis if GPS changes while file is staged
    useEffect(() => {
        if (file && location && !loading && !success) {
            handleAnalyzeEvidence(file);
        }
    }, [location?.lat, location?.lng, file]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[60]"
                    />

                    <motion.div
                        initial={{ y: "100%", opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: "100%", opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 right-0 left-0 md:left-80 m-4 md:m-10 bento-tile p-8 md:p-12 z-[70] shadow-[0_0_100px_rgba(139,92,246,0.3)] max-w-5xl mx-auto overflow-hidden border-neon-violet/20"
                    >
                        {/* Dynamic Background Mesh */}
                        <div className="absolute inset-0 bg-mesh-vibrant opacity-5 z-[-1]" />

                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h2 className="text-4xl font-black tracking-tightest text-white uppercase italic">Solaris Lens <span className="text-neon-cyan">V3</span></h2>
                                <p className="text-[10px] font-black text-neon-cyan uppercase tracking-[0.4em] mt-1 flex items-center gap-2">
                                    <ShieldCheck size={12} className="text-neon-emerald animate-pulse" />
                                    Hypersaturated Forensic Protocol
                                </p>
                            </div>
                            <button onClick={onClose} className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full transition-all text-white haptic-pulse">
                                <X size={24} />
                            </button>
                        </div>

                        {success ? (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <motion.div
                                    initial={{ scale: 0, rotate: 180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    className="w-32 h-32 bg-gradient-to-br from-neon-violet to-neon-cyan rounded-[3rem] flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(139,92,246,0.5)]"
                                >
                                    <CheckCircle2 className="text-white w-16 h-16" />
                                </motion.div>
                                <h3 className="text-4xl font-black text-white uppercase tracking-tightest mb-6">Evidence Synchronized</h3>
                                <p className="text-sm text-white/60 leading-relaxed font-bold uppercase tracking-[0.2em] max-w-lg">The matrix has accepted your report. Integrity hashing complete. Citizen reputation updated.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="flex gap-6 p-2 bg-white/5 rounded-[2.5rem] border border-white/10 max-w-lg">
                                    <button
                                        type="button"
                                        onClick={() => setTab("visual")}
                                        className={cn("flex-1 py-4 text-[11px] font-black uppercase tracking-[0.3em] rounded-3xl transition-all haptic-pulse", tab === "visual" ? "bg-gradient-to-r from-neon-violet to-neon-cyan text-white shadow-lg" : "text-white/40 hover:text-white")}
                                    >
                                        Visual Proof
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setTab("voice")}
                                        className={cn("flex-1 py-4 text-[11px] font-black uppercase tracking-[0.3em] rounded-3xl transition-all haptic-pulse", tab === "voice" ? "bg-gradient-to-r from-neon-violet to-neon-cyan text-white shadow-lg" : "text-white/40 hover:text-white")}
                                    >
                                        Voice Proof
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    <div className="space-y-8">
                                        {tab === "visual" ? (
                                            <label className="aspect-[16/10] rounded-[3.5rem] border-2 border-dashed border-neon-cyan/30 flex flex-col items-center justify-center gap-8 bg-neon-cyan/5 group hover:bg-neon-cyan/10 transition-all cursor-pointer relative overflow-hidden haptic-pulse">
                                                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                                {preview ? (
                                                    <div className="absolute inset-0 w-full h-full">
                                                        <img src={preview} alt="Evidence" className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="w-24 h-24 rounded-full bg-neon-cyan/20 flex items-center justify-center text-neon-cyan group-hover:scale-110 group-hover:rotate-12 transition-transform shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                                                            <Camera size={40} />
                                                        </div>
                                                        <p className="text-[12px] font-black text-neon-cyan uppercase tracking-[0.4em]">Initialize Optical Capture</p>
                                                    </>
                                                )}
                                                {/* Scanline */}
                                                <motion.div
                                                    animate={{ top: ["0%", "100%", "0%"] }}
                                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                    className="absolute inset-x-0 h-[2px] bg-neon-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10 pointer-events-none"
                                                />
                                            </label>
                                        ) : (
                                            <VoiceReporter
                                                onStatusChange={setVoiceStatus}
                                                onTranscript={(text) => setAudit({ description: text, detectedIssues: ["Voice Integrity Log"], confidence: 0.99 })}
                                            />
                                        )}

                                        <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 space-y-6">
                                            <div className="flex items-center justify-between">
                                                <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em]">Privacy Encryption Tunnel</p>
                                                <ShieldCheck size={16} className="text-neon-emerald" />
                                            </div>
                                            <div className="flex flex-wrap gap-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsAnonymous(!isAnonymous)}
                                                    className={cn("px-6 py-3 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all haptic-pulse", isAnonymous ? "bg-neon-emerald/20 border-neon-emerald/40 text-neon-emerald" : "bg-white/5 border-white/10 text-white/40")}
                                                >
                                                    Identity Masking: {isAnonymous ? "LOCKED" : "OPEN"}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsObfuscated(!isObfuscated)}
                                                    className={cn("px-6 py-3 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all haptic-pulse", isObfuscated ? "bg-neon-emerald/20 border-neon-emerald/40 text-neon-emerald" : "bg-white/5 border-white/10 text-white/40")}
                                                >
                                                    Spatial Blurring: {isObfuscated ? "MAX" : "MIN"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-10">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[11px] font-black text-white/40 uppercase tracking-widest">Temporal Ward Sync</label>
                                                <div className="flex flex-col gap-2">
                                                    <div className={cn("flex items-center gap-3 text-lg font-black", locationError ? "text-neon-pink" : "text-white")}>
                                                        <MapPin size={22} className={locationError ? "text-neon-pink" : "text-neon-cyan animate-pulse"} />
                                                        <span className="truncate">{isObfuscated ? "SECURE NODE • K-WEST" : (location ? (locationError ? `WARD NODE • ${location.lat.toFixed(4)}` : `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`) : "ACQUIRING GPS...")}</span>
                                                    </div>
                                                    {locationError && (
                                                        <div className="flex items-center gap-2 p-3 bg-neon-pink/10 border border-neon-pink/20 rounded-xl">
                                                            <AlertTriangle size={14} className="text-neon-pink" />
                                                            <p className="text-[9px] font-bold text-neon-pink uppercase">Failsafe: Using Solaris Ward Node (GPS restricted by Protocol)</p>
                                                            <button type="button" onClick={detectLocation} className="ml-auto p-1 hover:bg-neon-pink/20 rounded haptic-pulse">
                                                                <RefreshCw size={12} className="text-neon-pink" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="space-y-3 sm:text-right">
                                                <label className="text-[11px] font-black text-white/40 uppercase tracking-widest">Uplink Integrity</label>
                                                <div>
                                                    <div className={cn(
                                                        "px-6 py-2 rounded-full text-[10px] font-black uppercase inline-block border shadow-lg",
                                                        integrity?.badge === "VERIFIED" ? "bg-neon-emerald/20 border-neon-emerald/40 text-neon-emerald" : "bg-white/5 border-white/10 text-white/40"
                                                    )}>
                                                        {integrity ? `${integrity.badge} • ${integrity.score}%` : "WAITING FOR UPLINK"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {audit && (
                                            <div className="p-10 rounded-[4rem] bg-gradient-to-br from-neon-violet/10 to-neon-cyan/10 border border-white/20 space-y-6 relative overflow-hidden group haptic-pulse">
                                                <div className="absolute inset-0 bg-mesh-vibrant opacity-10 z-0" />
                                                <div className="relative z-10">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <BadgeCheck size={24} className="text-neon-gold" />
                                                        <p className="text-[13px] font-black text-white uppercase tracking-[0.3em]">AI Forensic Telemetry</p>
                                                    </div>
                                                    <p className="text-lg font-bold text-white leading-relaxed italic border-l-4 border-neon-gold pl-6">"{audit.description}"</p>
                                                    <div className="flex flex-wrap gap-3 mt-8">
                                                        {audit.detectedIssues.map((tag: any) => (
                                                            <span key={tag} className="px-5 py-2 bg-white/10 rounded-full text-[10px] font-black text-neon-cyan border border-white/10 shadow-xl uppercase tracking-widest backdrop-blur-md">#{tag}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            disabled={loading || (!file && !audit) || voiceStatus === "recording"}
                                            type="submit"
                                            className={cn(
                                                "w-full h-24 button-vibrant shadow-[0_0_50px_rgba(139,92,246,0.5)] haptic-pulse flex items-center justify-center gap-6 text-[14px]",
                                                voiceStatus === "recording" && "opacity-50 cursor-not-allowed grayscale"
                                            )}
                                        >
                                            {loading ? <Loader2 className="animate-spin w-8 h-8" /> : (
                                                <>
                                                    {voiceStatus === "recording" ? "RECORDING EVIDENCE..." : "DEPLOY TO GRID"}
                                                    <MessageSquare size={24} fill="white" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
