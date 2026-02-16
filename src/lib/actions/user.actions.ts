"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function updateUserName(clerkId: string, name: string) {
    try {
        const user = await db.user.update({
            where: { clerkId },
            data: { name }
        });

        revalidatePath("/settings");
        revalidatePath("/dashboard");
        return { success: true, message: "Profile updated successfully.", user };
    } catch (error) {
        console.error("Error updating user name:", error);
        return { success: false, message: "Failed to update profile. Please try again." };
    }
}

export async function getUserProfile(clerkId: string) {
    try {
        const user = await db.user.findUnique({
            where: { clerkId },
            include: { ward: true }
        });
        return user;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
}
