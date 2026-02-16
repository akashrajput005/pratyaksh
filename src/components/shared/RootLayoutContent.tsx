"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/shared/Sidebar";
import GlobalHeader from "@/components/shared/GlobalHeader";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RootLayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isPublicPage = pathname === "/" || pathname === "/login";

    if (!mounted) return null;

    return (
        <div className="relative font-sans antialiased text-foreground selection:bg-accent-gold/20 scroll-smooth">
            {/* Navigation Layer */}
            {!isPublicPage ? (
                <>
                    <Sidebar />
                    <GlobalHeader />
                </>
            ) : (
                <GlobalHeader />
            )}

            {/* Main Application Logic */}
            <div className={cn(
                "flex flex-col min-h-screen relative transition-all duration-1000 ease-[var(--spring-easing)]",
                !isPublicPage ? "lg:pl-80" : "pl-0"
            )}>
                <main className={cn(
                    "flex-1 relative z-10 w-full max-w-[1700px] mx-auto",
                    !isPublicPage ? "pt-40 px-8 md:px-12 pb-24" : "pt-0"
                )}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.99 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {/* Aesthetic Background Layer */}
            <div className="fixed inset-0 solaris-ultra-mesh z-[-1]" />
        </div>
    );
}
