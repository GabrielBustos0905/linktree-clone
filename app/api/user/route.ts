import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { getUserByUsername } from "@/data/user";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        const data = await req.json();
        const { name, username, image, links, typeUser } = data;
        
        const existingUser = await getUserByUsername(username)

        if(!session?.user.id) return new NextResponse("Unauthorized", { status: 401 });

        if(existingUser) return NextResponse.json(
            {
                message: "Email already exist!"
            },
            {
                status: 404
            }
        )

        const user = await db.user.update({
            where: {
                id: session.user.id
            },
            data: {
                name,
                username,
                image,
                firstLogin: false,
                typeUser,
                links: {
                    create: links
                }
            }
        });

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error creating user!",
                error: error
            },
            {
                status: 500
            }
        )
    }
} 