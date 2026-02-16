"use client";

import { useEffect, useState } from "react";

export default function VersionPage() {
    const buildTime = "2026-02-17 04:20:00 UTC";
    const version = "V24.0-FORCE-SYNC";

    return (
        <div style={{ padding: '40px', background: '#000', color: '#0f0', fontFamily: 'monospace' }}>
            <h1>SOLARIS CORE SYNC STATUS</h1>
            <p>VERSION: {version}</p>
            <p>BUILD TIME: {buildTime}</p>
            <p>CLIENT TIME: {new Date().toISOString()}</p>
            <hr />
            <p>If you see this, the V24.0 deployment is LIVE.</p>
        </div>
    );
}
