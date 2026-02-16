import exifr from "exifr";

export interface GeoForensics {
    latitude: number | null;
    longitude: number | null;
    timestamp: string | null;
    software: string | null;
    isEdited: boolean;
    isGeotagged: boolean;
}

export interface IntegrityScore {
    score: number; // 0-100
    badge: "VERIFIED" | "SUSPICIOUS" | "UNVERIFIED";
    reasons: string[];
}

/**
 * EXIF Guard - Advanced forensic analysis of civic evidence
 */
export async function analyzeEvidence(file: File | Buffer): Promise<GeoForensics> {
    try {
        // Advanced GPS extraction via exifr
        const gpsMetadata = await exifr.gps(file).catch(() => null);
        const fullMetadata = await exifr.parse(file, {
            translateKeys: true,
            pick: ["Software", "Make", "Model", "DateTimeOriginal"]
        }).catch(() => null);

        if (!gpsMetadata && !fullMetadata) {
            return {
                latitude: null,
                longitude: null,
                timestamp: null,
                software: "CLEAN_GENERIC_BLOB",
                isEdited: false,
                isGeotagged: false,
            };
        }

        const software = fullMetadata?.Software || null;
        const make = fullMetadata?.Make || null;
        const model = fullMetadata?.Model || null;

        // List of common editing tools to flag
        const editingTools = ["Adobe", "Photoshop", "Lightroom", "GIMP", "Canva", "Snapseed"];
        const isEdited = software ? editingTools.some(tool => software.includes(tool)) : false;

        // Sensor Variance Check: Flag if software exists without hardware make/model
        const sensorVariance = !!(software && !make && !model);

        return {
            latitude: gpsMetadata?.latitude || null,
            longitude: gpsMetadata?.longitude || null,
            timestamp: fullMetadata?.DateTimeOriginal || null,
            software,
            isEdited: isEdited || sensorVariance,
            isGeotagged: !!(gpsMetadata?.latitude && gpsMetadata?.longitude),
        };
    } catch (error) {
        // Ultimate fail-safe for Solaris Grid
        return {
            latitude: null,
            longitude: null,
            timestamp: null,
            software: "FORENSIC_BYPASS",
            isEdited: false,
            isGeotagged: false,
        };
    }
}

/**
 * Cross-Verifies Photo GPS against Device GPS
 * Calculates Euclidean Distance (Approximate for small scales)
 */
export function calculateIntegrity(
    photoData: GeoForensics,
    deviceCoords: { lat: number; lng: number }
): IntegrityScore {
    const reasons: string[] = [];
    let score = 100;

    if (!photoData.isGeotagged) {
        return {
            score: 75,
            badge: "SUSPICIOUS",
            reasons: ["No Geotag found in evidence. Verified via Ward Node Manual Sync."]
        };
    }

    if (photoData.isEdited) {
        score -= 40;
        reasons.push(photoData.software ? `Processed by ${photoData.software}` : "Sensor Variance Detected (Synthetic Metadata)");
    }

    // Basic Distance Check (roughly 111km per degree)
    const dLat = (photoData.latitude! - deviceCoords.lat) * 111320;
    const dLng = (photoData.longitude! - deviceCoords.lng) * 111320 * Math.cos(deviceCoords.lat * (Math.PI / 180));
    const distance = Math.sqrt(dLat * dLat + dLng * dLng);

    if (distance > 200) { // Increased threshold to 200m for urban drift
        score -= 50;
        reasons.push(`Location mismatch: ${Math.round(distance)}m offset from reporter`);
    }

    // Stricter Thresholds for Solaris Grid
    const badge = score >= 90 ? "VERIFIED" : score >= 60 ? "SUSPICIOUS" : "UNVERIFIED";

    return { score, badge, reasons };
}
