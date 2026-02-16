# System Architecture 🏗️🛡️

Pratyaksh is built as a highly responsive, secure, and spatial web application. It leverages modern React patterns and server-side verification to ensure data integrity.

## 🧱 The Core Stack

- **Frontend:** Next.js 16+ (App Router) for high-performance server-side rendering and client-side transitions.
- **Verification Engine:** **EXIF Guard** (Node.js/TypeScript) for on-the-fly forensic analysis of multimedia evidence.
- **Spatial Layer:** **Leaflet** with custom "Cyber-Dark" tile filtering for high-contrast locality reporting.
- **Styling:** **Solaris Ultra** design tokens built on Tailwind CSS.
- **Database:** **Prisma ORM** connecting to a PostgreSQL/MongoDB instance for persistent accountability storage.

## 🔄 Data Pipeline (The "Forensic Uplink")

1.  **Capture:** User captures/uploads evidence via the `IssueDrawer` (Visual or Voice Proof).
2.  **Forensics & AI Audit:**
    - **Metadata Extraction:** `exif-guard` extracts GPS, Hardware, and Software signatures.
    - **Vision AI Audit:** `vision-system` performs semantic analysis to detect categories (Pothole, Garbage, etc.) and assign a confidence score.
    - **Base64 Persistence:** Evidence is converted to a persistent Base64 string for long-term grid auditability.
3.  **Submission:** Data is committed via Server Action (`createIssue`).
4.  **Resolution Loop:**
    - **Status Tracking:** Issues are marked as `OPEN` on the Global Accountability Feed.
    - **Semantic Closure:** Official resolution triggers a database mutation (`updateIssueStatus`) and path revalidation.
5.  **Grid Broadcast:** The **Spatial Matrix** (Leaflet) and **Accountability Dashboard** refresh to show the live grid state.

## 🛡️ Security Model

- **Digital Notarization:** Each piece of evidence is tagged with its forensic signature.
- **RBAC:** Differential views for **Citizens**, **Ward Officials**, and **System Admins**.
- **Secure Tunneling:** Evidence data is passed through high-fidelity transitions to prevent UI spoofing.

## 📁 File Structure Highlights
- `/src/app`: Root layouts and page routes (Solaris Mesh applied at layout level).
- `/src/components/shared`: Core components like `Sidebar`, `AccountabilityMap`, and `IssueDrawer`.
- `/src/components/ui`: Atomic Solaris primitives (`BentoGrid`, `GlowBorder`).
- `/src/lib/forensics`: The heart of the integrity system (`exif-guard.ts`).
- `/src/lib/actions`: Server-side logic for issue lifecycle management.
