// import { auth, signOut } from "@/auth";

import { infoUser } from "@/actions/info-user"
import { signOut } from "@/auth"

export default async function DashboardPage() {
    const user = await infoUser()

    return (
        <div>
            {
                JSON.stringify(user)
            }
            <form
                action={async () => {
                    "use server"
                    await signOut({ redirectTo: "/auth/login" })
                }}
            >
                <button type="submit">Sign Out</button>
            </form>
        </div>
    )
}