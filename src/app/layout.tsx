import type { Metadata } from 'next'
import './globals.css'
import RootLayoutContent from '@/components/shared/RootLayoutContent'

export const metadata: Metadata = {
    title: 'Pratyaksh | Solaris Amore Grid',
    description: 'AI-Driven Civic Accountability & Forensic Integrity Network',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
            <body className="min-h-screen selection:bg-rose-500/30 overflow-x-hidden relative bg-[#0a0118] antialiased">
                <RootLayoutContent>{children}</RootLayoutContent>
            </body>
        </html>
    )
}
