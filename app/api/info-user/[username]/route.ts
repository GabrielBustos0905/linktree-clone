import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
    // console.log(params.username)
    try {
        const username = params.username;

        if(!username) return NextResponse.json({ message: "Username is Required!"}, { status: 400 });

        const user = await db.user.findUnique({
            where: { username },
            include: { links: true }
        });

        if(!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ message: "Error geting user!", error: error }, { status: 500})
    }
}