import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth()
        if(!session?.user.id) return NextResponse.json({ message: "Unauthorized"}, { status: 401 });

        const existingUser = await db.user.findUnique({
            where: {
                id: session.user.id
            },
            include: {
                links: true
            }
        });

        return NextResponse.json(existingUser)
    } catch (error) {
        console.log("[GET_USER_FIRST_LOGIN]", error);
        return NextResponse.json({ message: "Error fetching user" }, {status: 500})
    }
}