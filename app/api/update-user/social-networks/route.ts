import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        const data = await req.json();

        if(!session?.user.id) return new NextResponse("Unauthorized", { status: 401 });

        const socialNetwork = await db.link.create({
            data: {
                userId: session.user.id,
                link: data.link,
                icon: data.icon,
                name: data.name 
            }
        });

        return NextResponse.json(socialNetwork, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error creating social network!",
                error: error
            },
            {
                status: 500
            }
        )
    }
}