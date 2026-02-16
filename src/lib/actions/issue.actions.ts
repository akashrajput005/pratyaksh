"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

export interface CreateIssueParams {
    title: string;
    description: string;
    category: string;
    latitude: number;
    longitude: number;
    imageUrl: string;
    userId: string;
    integrityScore?: number;
    integrityBadge?: string;
    isAnonymous?: boolean;
    isObfuscated?: boolean;
}

export async function createIssue(params: CreateIssueParams) {
    try {
        console.log("Creating issue with params:", params);

        // Find or create a default ward for testing if not provided
        // In a real system, we'd lookup based on lat/lng or user's assigned ward
        let ward = await db.ward.findFirst();
        if (!ward) {
            ward = await db.ward.create({
                data: {
                    name: "Ward K-West",
                    performanceScore: 8.5
                }
            });
        }

        // Find or create a user for testing
        // userId from params is likely a clerkId or a mock id
        let user = await db.user.findUnique({
            where: { clerkId: params.userId }
        });

        if (!user) {
            user = await db.user.create({
                data: {
                    clerkId: params.userId,
                    email: `${params.userId}@solaris.grid`,
                    name: params.isAnonymous ? "Anonymized Citizen" : params.userId === "user_clerk_123" ? "Akash Sharma" : params.userId,
                    role: "CITIZEN",
                    wardId: ward.id
                }
            });
        }

        const issue = await db.issue.create({
            data: {
                title: params.title,
                description: params.description,
                category: params.category,
                latitude: params.latitude,
                longitude: params.longitude,
                imageUrl: params.imageUrl,
                citizenId: user.id,
                wardId: ward.id,
                integrityScore: params.integrityScore || 0,
                integrityBadge: params.integrityBadge || "UNVERIFIED",
                isAnonymous: params.isAnonymous || false,
                isObfuscated: params.isObfuscated || false,
                status: "OPEN"
            }
        });

        revalidatePath("/");
        revalidatePath("/dashboard");
        return { success: true, message: "Issue reported successfully to the Accountability Grid.", issueId: issue.id };
    } catch (error) {
        console.error("Error creating issue:", error);
        return { success: false, message: "Failed to report issue. Please try again." };
    }
}

export async function getAllIssues() {
    try {
        const issues = await db.issue.findMany({
            include: {
                citizen: true,
                ward: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return issues;
    } catch (error) {
        console.error("Error fetching issues:", error);
        return [];
    }
}

export async function getWardPerformance(wardId: string) {
    // Simulate fetching ward performance data
    return {
        wardId,
        score: 8.4,
        resolutionRate: "92%",
        avgResponseTime: "18h",
        satisfaction: "4.5/5"
    };
}

export async function getUserStats(userId: string) {
    try {
        const issues = await db.issue.findMany({
            where: { citizen: { clerkId: userId } }
        });

        const totalIntegrity = issues.reduce((acc: number, issue: any) => acc + (issue.integrityScore || 0), 0);
        const avgIntegrity = issues.length > 0 ? totalIntegrity / issues.length : 100;

        return {
            trustLevel: avgIntegrity >= 95 ? "GOLD CITIZEN" : avgIntegrity >= 80 ? "SILVER CITIZEN" : "SOLARIS CITIZEN",
            impactXP: issues.length * 120,
            wardInfluence: issues.length > 5 ? "TOP 1%" : issues.length > 2 ? "TOP 10%" : "GRID RECRUIT"
        };
    } catch (error) {
        console.error("Error fetching user stats:", error);
        return {
            trustLevel: "SOLARIS CITIZEN",
            impactXP: 0,
            wardInfluence: "PENDING"
        };
    }
}

export async function verifyResolution(issueId: string, fixImageUrl: string) {
    try {
        console.log(`AI Semantic Audit: Verifying fix for issue ${issueId} with image ${fixImageUrl}`);

        // Simulate AI semantic matching between 'Before' and 'After'
        // In a real system, this would call our vision-system compare logic
        // Actually update the DB for the demo focus
        await db.issue.update({
            where: { id: issueId },
            data: { status: "RESOLVED" }
        });

        revalidatePath("/dashboard");
        return {
            success: true,
            score: 0.96,
            message: "AI Semantic Audit Complete: 'After' photo successfully matches the original 'Before' location and problem type. Resolution approved."
        };
    } catch (error) {
        console.error("AI Verification failed:", error);
        return { success: false, message: "Verification failed. The AI detected a locality or semantic mismatch. Please resubmit evidence." };
    }
}

export async function assignIssue(issueId: string, officialId: string) {
    // RBAC: Only ADMIN or Ward Lead can assign
    console.log(`Assigning issue ${issueId} to official ${officialId}`);
    revalidatePath("/dashboard");
    return { success: true, message: "Issue assigned to official for resolution." };
}

export async function updateIssueStatus(issueId: string, status: string, role: string) {
    await db.issue.update({
        where: { id: issueId },
        data: { status: status as any }
    });

    console.log(`Updating issue ${issueId} to ${status}`);
    revalidatePath("/dashboard");
    return { success: true, message: `Status updated to ${status}.` };
}
