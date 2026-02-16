"use client";

import { motion } from "framer-motion";

interface SolarisLogoProps {
    size?: "sm" | "md" | "lg" | "xl";
    animate?: boolean;
}

export default function SolarisLogo({ size = "md", animate = true }: SolarisLogoProps) {
    const dimensions = {
        sm: 32,
        md: 48,
        lg: 64,
        xl: 96
    }[size];

    return (
        <motion.div
            style={{ width: dimensions, height: dimensions }}
            className="relative flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            initial={animate ? { scale: 0.8, opacity: 0 } : {}}
            animate={animate ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
            {/* Outer Monolith Ring */}
            <motion.svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full"
                animate={animate ? { rotate: 360 } : {}}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="rgba(34, 211, 238, 0.2)"
                    strokeWidth="0.5"
                    strokeDasharray="4 8"
                />
            </motion.svg>

            {/* The Monolith Core */}
            <div className="relative w-3/5 h-3/5">
                {/* Core Glow */}
                <motion.div
                    animate={animate ? {
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                    } : {}}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-cyan-400/40 blur-xl rounded-full"
                />

                <svg viewBox="0 0 100 100" className="relative z-10 w-full h-full">
                    <defs>
                        <linearGradient id="monolithGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#22d3ee" />
                            <stop offset="100%" stopColor="#0ea5e9" />
                        </linearGradient>
                    </defs>

                    {/* Geometric Monolith Structure */}
                    <motion.path
                        d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
                        fill="none"
                        stroke="url(#monolithGrad)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />

                    {/* Inner Core Pulse */}
                    <motion.path
                        d="M50 30 L65 40 L65 60 L50 70 L35 60 L35 40 Z"
                        fill="url(#monolithGrad)"
                        animate={animate ? {
                            opacity: [0.3, 1, 0.3],
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Scanning Beam */}
                    <motion.rect
                        x="0"
                        y="0"
                        width="100"
                        height="2"
                        fill="rgba(34, 211, 238, 0.5)"
                        animate={animate ? {
                            y: [10, 90, 10],
                            opacity: [0, 1, 0]
                        } : { opacity: 0 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                </svg>
            </div>

            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full -z-10" />
        </motion.div>
    );
}
