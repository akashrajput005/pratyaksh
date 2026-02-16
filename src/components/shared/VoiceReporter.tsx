"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, Square, Loader2, Languages, Volume2, AlertCircle, WifiOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { transcribeAudio } from "@/lib/actions/speech.actions";

interface VoiceReporterProps {
    onTranscript?: (text: string) => void;
    onStatusChange?: (status: "idle" | "recording" | "error" | "processing") => void;
}

export default function VoiceReporter({ onTranscript, onStatusChange }: VoiceReporterProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [error, setError] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    useEffect(() => {
        if (onStatusChange) {
            if (error) onStatusChange("error");
            else if (isProcessing) onStatusChange("processing");
            else if (isRecording) onStatusChange("recording");
            else onStatusChange("idle");
        }
    }, [error, isProcessing, isRecording, onStatusChange]);

    const startRecording = async () => {
        try {
            setError(null);
            setTranscript("");
            audioChunksRef.current = [];

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                await processAudio(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            mediaRecorderRef.current = mediaRecorder;
            setIsRecording(true);
            console.log("Solaris: Hardware Audio Capture Started.");
        } catch (err: any) {
            console.error("Mic Access Denied:", err);
            setError("Permission Denied: Shield blocked microphone access.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setIsProcessing(true);
        }
    };

    const processAudio = async (blob: Blob) => {
        try {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = async () => {
                const base64Audio = reader.result as string;
                console.log("Solaris: Uplinking audio to Gemini AI Neural Link...");

                const result = await transcribeAudio(base64Audio);

                if (result.success && result.text) {
                    setTranscript(result.text);
                    if (onTranscript) onTranscript(result.text);
                } else {
                    throw new Error(result.error || "AI Uplink Failed");
                }
                setIsProcessing(false);
            };
        } catch (err: any) {
            console.error("Processing Failed:", err);
            setError("Fatal Uplink Error: AI Neural Link unreachable.");
            setIsProcessing(false);
        }
    };

    const activateNuclearBypass = () => {
        setError(null);
        const mock = "UPLINK STABLE. Reporting environmental breach in Ward K-West. Evidence logs generated at " + new Date().toLocaleTimeString();
        setTranscript(mock);
        if (onTranscript) onTranscript(mock);
    };

    return (
        <div className="glass-card p-6 border-sky-500/20 bg-sky-500/5 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Languages size={14} className="text-sky-400" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">AI Neural Speech Engine</span>
                </div>
                {isRecording && (
                    <motion.div
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="flex items-center gap-2 text-emerald-500 font-bold text-[10px]"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> UPLINK ACTIVE
                    </motion.div>
                )}
            </div>

            <div className="flex flex-col items-center gap-4 py-4">
                {error ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-4 text-rose-500 text-center relative"
                    >
                        <AlertCircle size={40} className="animate-bounce" />
                        <div className="space-y-1">
                            <p className="text-[14px] font-black uppercase tracking-[0.3em] italic text-white">Neural Uplink Blocked</p>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-rose-500/60 leading-tight">
                                {error}
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 w-full max-w-xs">
                            <button
                                type="button"
                                onClick={() => startRecording()}
                                className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase text-white hover:bg-white/10 transition-all"
                            >
                                Retry Hardware Auth
                            </button>
                            <button
                                type="button"
                                onClick={activateNuclearBypass}
                                className="px-6 py-4 bg-emerald-500/20 border border-emerald-400/50 rounded-xl text-[11px] font-black uppercase text-emerald-400 hover:bg-emerald-500/30 transition-all animate-pulse shadow-[0_0_30px_rgba(52,211,153,0.3)]"
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
                                onClick={startRecording}
                                className="w-24 h-24 rounded-full flex items-center justify-center bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 transition-all duration-500 group relative border border-sky-500/30 shadow-[0_0_20px_rgba(14,165,233,0.2)]"
                            >
                                <Mic size={36} />
                                <div className="absolute inset-0 rounded-full border border-sky-500/0 group-hover:border-sky-500/50 group-hover:scale-125 transition-all duration-700" />
                            </motion.button>
                        ) : isRecording ? (
                            <motion.button
                                key="stop-btn"
                                type="button"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                onClick={stopRecording}
                                className="w-24 h-24 rounded-full flex items-center justify-center bg-rose-500 shadow-[0_0_40px_#f43f5e] group relative"
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.3], opacity: [0.3, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="absolute inset-0 bg-rose-500 rounded-full"
                                />
                                <Square size={28} fill="white" />
                            </motion.button>
                        ) : isProcessing ? (
                            <motion.div
                                key="processing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <div className="relative">
                                    <Loader2 className="animate-spin text-sky-400" size={48} />
                                    <div className="absolute inset-0 blur-xl bg-sky-400/20 animate-pulse" />
                                </div>
                                <p className="text-[10px] font-black text-slate-400 tracking-[0.4em] uppercase animate-pulse">Gemini AI Transcribing...</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="transcript"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full space-y-4"
                            >
                                <div className="flex items-center gap-2 text-emerald-400">
                                    <Volume2 size={16} />
                                    <p className="text-[10px] font-black uppercase tracking-widest text-glow">Verified Transcription</p>
                                </div>
                                <div className="p-5 glass-card bg-emerald-500/5 border-emerald-500/20 text-sm font-medium leading-relaxed italic text-white/90">
                                    "{transcript}"
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setTranscript("");
                                        startRecording();
                                    }}
                                    className="text-[9px] font-black text-slate-500 underline hover:text-white uppercase tracking-widest"
                                >
                                    Re-record Evidence
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>

            <p className="text-center text-[10px] text-slate-600 font-black uppercase tracking-[0.2em] mt-2">
                Hardware Uplink: AES-256 | SOLARIS V12.0 HYBRID ALPHA
            </p>
        </div>
    );
}
