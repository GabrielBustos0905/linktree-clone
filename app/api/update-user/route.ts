import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function PATCH(req: NextRequest) {
    try {
        const session = await auth();
        if(!session?.user.id) return new NextResponse("Unauthorized", { status:401 });

        const data = await req.json();

        const updateUser = await db.user.update({
            where: {
                id: session.user.id
            },
            data: data
        });

        return NextResponse.json(updateUser)
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error updating user!",
                error: error
            },
            {
                status: 500
            }
        )
    }
}