"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ReactNode, useState } from "react";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1700px] mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoCard = ({
    title,
    description,
    header,
    className,
    icon,
    children,
    badge,
    badgeColor = "violet",
    headerClassName,
    onClick
}: {
    title: string | ReactNode;
    description?: string | ReactNode;
    header?: ReactNode;
    className?: string;
    icon?: ReactNode;
    children?: ReactNode;
    badge?: string;
    badgeColor?: "gold" | "cyan" | "emerald" | "violet" | "rose" | "green";
    headerClassName?: string;
    onClick?: () => void;
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const badgeStyles = {
        gold: "bg-neon-gold/20 text-neon-gold border-neon-gold/30",
        cyan: "bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30",
        emerald: "bg-neon-emerald/20 text-neon-emerald border-neon-emerald/30",
        violet: "bg-neon-violet/20 text-neon-violet border-neon-violet/30",
        rose: "bg-neon-pink/20 text-neon-pink border-neon-pink/30",
        green: "bg-[#25D366]/20 text-[#25D366] border-[#25D366]/30",
    };

    return (
        <motion.div
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className={cn(
                "bento-tile flex flex-col p-8 md:p-10 relative group border-white/10 overflow-hidden",
                onClick && "cursor-pointer",
                className
            )}
        >
            {/* Dynamic Hover Glow */}
            <motion.div
                style={{
                    x: useTransform(mouseX, [-0.5, 0.5], [-150, 150]),
                    y: useTransform(mouseY, [-0.5, 0.5], [-150, 150]),
                }}
                animate={{
                    opacity: isHovered ? 0.3 : 0,
                }}
                className={cn(
                    "absolute inset-0 blur-[120px] rounded-full pointer-events-none transition-opacity duration-700 z-0",
                    badgeColor === "violet" && "bg-neon-violet",
                    badgeColor === "cyan" && "bg-neon-cyan",
                    badgeColor === "emerald" && "bg-neon-emerald",
                    badgeColor === "gold" && "bg-neon-gold",
                    badgeColor === "rose" && "bg-neon-pink",
                    badgeColor === "green" && "bg-[#25D366]"
                )}
            />

            {/* Header Content */}
            {header && (
                <div className={cn("relative z-10 w-full mb-8", headerClassName)}>
                    {header}
                </div>
            )}

            <div className="flex justify-between items-start mb-6 relative z-10 w-full">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                    {icon}
                </div>
                {badge && (
                    <div className={cn(
                        "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border shadow-sm backdrop-blur-md",
                        badgeStyles[badgeColor]
                    )}>
                        {badge}
                    </div>
                )}
            </div>

            <div className="space-y-3 relative z-10 w-full">
                <h3 className="text-xl font-black text-white uppercase tracking-tight italic">
                    {title}
                </h3>
                {description && (
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-relaxed">
                        {description}
                    </p>
                )}
            </div>

            {children && (
                <div className="mt-8 flex-1 relative z-10 flex flex-col items-center w-full">
                    {children}
                </div>
            )}

            {/* Subtle Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.div>
    );
};
