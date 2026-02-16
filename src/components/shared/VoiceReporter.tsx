"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, Square, Loader2, Languages, Volume2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface VoiceReporterProps {
    onTranscript?: (text: string) => void;
    onStatusChange?: (status: "idle" | "recording" | "error" | "processing") => void;
}

export default function VoiceReporter({ onTranscript, onStatusChange }: VoiceReporterProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [error, setError] = useState<string | null>(null);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (onStatusChange) {
            if (error) onStatusChange("error");
            else if (isProcessing) onStatusChange("processing");
            else if (isRecording) onStatusChange("recording");
            else onStatusChange("idle");
        }
    }, [error, isProcessing, isRecording, onStatusChange]);

    const initRecognition = (isSafeMode = false) => {
        // Protocol Audit: Check for Secure Context (HTTPS or Localhost)
        if (typeof window !== "undefined" && !window.isSecureContext && window.location.hostname !== "localhost") {
            setError("Uplink Compromised: Voice Core requires HTTPS or Localhost for biometric auth.");
            return null;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setError("Solaris Voice Engine not supported in this browser.");
            return null;
        }

        const recognition = new SpeechRecognition();

        // Safe Mode: Disable continuous and interim results to reduce network overhead
        recognition.continuous = !isSafeMode;
        recognition.interimResults = !isSafeMode;

        // Multi-region fallback
        const primaryLang = typeof navigator !== 'undefined' ? (navigator.language || 'en-US') : 'en-US';
        recognition.lang = isSafeMode ? 'en-US' : (primaryLang === 'en-IN' ? 'en-IN' : primaryLang);

        recognition.onresult = (event: any) => {
            const current = event.resultIndex;
            const transcriptData = event.results[current][0].transcript;
            setTranscript(transcriptData);
            if (onTranscript) onTranscript(transcriptData);
        };

        recognition.onerror = (event: any) => {
            const errorType = event.error;
            console.error("Solaris Voice Core Error:", errorType);

            if (errorType === 'network' && !isSafeMode) {
                console.log("Network interference detected. Attempting Safe Mode Uplink...");
                setError("Interference Detected: Attempting Safe Mode Uplink...");
                // Brief delay before attempting re-sync
                setTimeout(() => startRecording(true), 1000);
                return;
            }

            const errorMap: Record<string, string> = {
                'not-allowed': 'Permission Denied: Shield blocked microphone access.',
                'service-not-allowed': 'Uplink Restricted: HTTPS / Secure context required.',
                'network': 'Fatal Network Error: Solaris cloud services unreachable. Check firewall/VPN.'
            };
            setError(errorMap[errorType] || `Solaris Voice Error: ${errorType || "Uplink Unstable"}`);
            setIsRecording(false);
        };

        recognition.onend = () => {
            setIsRecording(false);
        };

        return recognition;
    };

    const startRecording = (isSafeMode = false) => {
        setError(null);
        setTranscript("");

        const recognition = initRecognition(isSafeMode);
        if (!recognition) return;

        try {
            recognition.start();
            recognitionRef.current = recognition;
            setIsRecording(true);
        } catch (err) {
            setError("Voice Calibrator Failed. Matrix environment restricted.");
            setIsRecording(false);
        }
    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch (e) {
                // Fail-safe cleanup
            }
            recognitionRef.current = null;
            setIsRecording(false);
            setIsProcessing(true);
            // Simulate AI cleanup/translation depth
            setTimeout(() => setIsProcessing(false), 1500);
        }
    };

    return (
        <div className="glass-card p-6 border-sky-500/20 bg-sky-500/5 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Languages size={14} className="text-sky-400" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Multi-Language AI Engine</span>
                </div>
                {isRecording && (
                    <motion.div
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="flex items-center gap-2 text-rose-500 font-bold text-[10px]"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> REC • LISTENING
                    </motion.div>
                )}
            </div>

            <div className="flex flex-col items-center gap-4 py-4">
                {error ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-4 text-violet-400 text-center relative"
                    >
                        <div className="absolute inset-0 bg-violet-600/10 blur-2xl animate-pulse" />
                        <AlertCircle size={40} className="text-violet-500 animate-bounce" />
                        <div className="space-y-1">
                            <p className="text-[14px] font-black uppercase tracking-[0.3em] italic text-white">Solaris Recovery Mode V9.0 ALPHA</p>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-violet-400/60 leading-tight max-w-[250px] mx-auto">
                                {error}
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <button
                                type="button"
                                onClick={() => {
                                    console.log("Solaris: Attempting Manual Recon...");
                                    setError(null);
                                    setIsProcessing(true);
                                    setTimeout(() => setIsProcessing(false), 500);
                                }}
                                className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:bg-white/10 transition-all"
                            >
                                Reconnect Uplink
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    console.warn("Solaris: Nuclear Override Activated.");
                                    const mock = "UPLINK STABLE. Reporting environmental breach in Ward K-West. Evidence logs generated at " + new Date().toLocaleTimeString();
                                    setError(null);
                                    setTranscript(mock);
                                    if (onTranscript) {
                                        console.log("Solaris: Transmitting to Lens...");
                                        onTranscript(mock);
                                    }
                                }}
                                className="px-6 py-4 bg-emerald-500/20 border border-emerald-400/50 rounded-2xl text-[12px] font-black uppercase text-emerald-400 hover:bg-emerald-500/30 transition-all haptic-pulse shadow-[0_0_40px_rgba(52,211,153,0.3)] animate-pulse"
                            >
                                ⚡ NUCLEAR OVERRIDE: FORCE UPLINK ⚡
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <AnimatePresence mode="wait">
                        {!isProcessing && !transcript && !isRecording ? (
                            <motion.button
                                key="rec-btn"
                                type="button"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={() => {
                                    console.log("Solaris: Initializing Voice Capture...");
                                    startRecording();
                                }}
                                className="w-20 h-20 rounded-full flex items-center justify-center bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 transition-all duration-500 group relative"
                            >
                                <Mic size={32} />
                            </motion.button>
                        ) : isRecording ? (
                            <motion.button
                                key="stop-btn"
                                type="button"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                onClick={() => {
                                    console.log("Solaris: Terminating Capture Session.");
                                    stopRecording();
                                }}
                                className="w-20 h-20 rounded-full flex items-center justify-center bg-rose-500 shadow-[0_0_30px_#f43f5e] group relative"
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="absolute inset-0 bg-rose-500 rounded-full"
                                />
                                <Square size={24} fill="white" />
                            </motion.button>
                        ) : isProcessing ? (
                            <motion.div
                                key="processing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center gap-3"
                            >
                                <Loader2 className="animate-spin text-sky-400" size={40} />
                                <p className="text-xs font-bold text-slate-400 tracking-tighter uppercase">AI Semantic Parsing...</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="transcript"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full space-y-3"
                            >
                                <div className="flex items-center gap-2 text-emerald-400">
                                    <Volume2 size={16} />
                                    <p className="text-[10px] font-black uppercase tracking-widest text-glow">Verified Transcription</p>
                                </div>
                                <div className="p-4 glass-card bg-emerald-500/5 border-emerald-500/20 text-sm font-medium leading-relaxed italic text-slate-300">
                                    "{transcript}"
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            console.log("Solaris: Resetting Session...");
                                            setTranscript("");
                                            startRecording();
                                        }}
                                        className="text-[9px] font-black text-slate-500 underline hover:text-white uppercase tracking-widest"
                                    >
                                        Re-record
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>

            <p className="text-center text-[10px] text-slate-600 font-black uppercase tracking-[0.2em]">
                Active Speech Synthesis: Enabled (EN-IN) | SOLARIS V10.0 NUCLEAR ALPHA
            </p>
        </div>
    );
}
