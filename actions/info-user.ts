import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function infoUser() {
    const user = await currentUser();

    if(!user?.id) return { error: "Usuario inexistente"};

    const existingUser = await db.user.findUnique({
        where: {
            id: user.id
        },
        include: {
            links: true
        }
    });

    return existingUser;
}