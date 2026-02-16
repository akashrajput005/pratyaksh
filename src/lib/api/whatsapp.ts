/**
 * WhatsApp Deep-link Bridge (Mock)
 * 
 * This module simulates the logic for generating WhatsApp reporting links 
 * and handling incoming deep-links from message notifications.
 */

export const generateWhatsAppLink = (issueId: string, ward: string) => {
    const baseUrl = "https://wa.me/91XXXXXXXXXX";
    const text = `REPORT: Issue #${issueId} detected in ${ward}. View Live on Grid: ${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/dashboard`;
    return `${baseUrl}?text=${encodeURIComponent(text)}`;
};

export const simulateIncomingWhatsAppTrigger = () => {
    console.log("SIMULATING: WhatsApp Webhook Trigger received...");
    return {
        success: true,
        data: {
            from: "+919988776655",
            message: "Water leak near bus stand",
            timestamp: Date.now()
        }
    };
};
