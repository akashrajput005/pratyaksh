"use server";

export async function transcribeAudio(base64Audio: string) {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
        return { success: false, error: "Solaris AI Key missing from Uplink." };
    }

    try {
        // Remove data:audio/...;base64, prefix if present
        const cleanBase64 = base64Audio.split(",")[1] || base64Audio;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: "Transcribe the following audio precisely. Respond ONLY with the transcription text, nothing else." },
                            {
                                inline_data: {
                                    mime_type: "audio/wav",
                                    data: cleanBase64
                                }
                            }
                        ]
                    }]
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini Speech Error:", data);
            throw new Error(data.error?.message || "Uplink Failed");
        }

        const transcription = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        return { success: true, text: transcription.trim() };

    } catch (error: any) {
        console.error("Solaris Voice Core Exception:", error);
        return { success: false, error: error.message || "Failed to parse AI Uplink." };
    }
}
