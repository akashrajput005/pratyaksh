# The Integrity Grid (Forensics Engine) 🛡️🔍

The core philosophy of Pratyaksh is "Visible Proof is Unforgeable." The **Integrity Grid** is the technical implementation of this promise.

## 🛠️ EXIF Guard Engine (`src/lib/forensics/exif-guard.ts`)
The forensic engine acts as a "Secure Tunnel" for image evidence.

### 1. Metadata Extraction
We extract deep EXIF tags from JPEG/PNG headers:
- `DateTimeOriginal`: Compares capture time vs. submission time to detect "old" evidence being re-used.
- `Software`: Flags signatures from editing suites like Photoshop, GIMP, or mobile apps like Snapseed.
- `GPSLatitude/Longitude`: The primary coordinate for the spatial grid.

### 2. Cross-Verification Logic
To prevent "couch-reporting" (reporting from a distance), we calculate the **Euclidean Distance** between:
- **Evidence Header GPS** (Where the photo was taken)
- **Reporter Live GPS** (Where the user is currently standing)

**Thresholds:**
- **< 200m:** Urban Sync (VERIFIED) - *Adjusted for urban signal drift.*
- **200m - 500m:** Moderate Variance (SUSPICIOUS)
- **Non-Geotagged:** 75% Grid Sync (SUSPICIOUS) - *Manual verification fallback for desktop/PC uploads.*

### 3. Trust Score Calculation
The final `integrityScore` is a weighted average:
- **40% Locality Sync:** Does the photo location match the device location?
- **40% Digital Purity:** Is the photo original or processed by editing software?
- **20% AI Semantic Match:** Does the AI-detected category match the reporter's claim?

## 🏷️ Trust Badges
- **VERIFIED 🛡️:** 90%+ Score. Evidence is original and locality-matched.
- **SUSPICIOUS ⚠️:** 60-89% Score. May be edited, reported from a distance, or missing metadata.
- **UNVERIFIED ❌:** <60% Score. Major metadata mismatch or tampering detected.

## 📁 Storage & Persistence
Evidence is stored as a **persistent Base64 string** coupled with its forensic metadata. This ensures that the audit history remains immutable even if the original temporary file is cleared from the device.
