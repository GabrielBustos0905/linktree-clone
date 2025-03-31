import { infoUserByUsername } from "@/actions/info-user";
import { NotFoundUser } from "./components/NotFoundUser";
import Image from "next/image";
import { UserLinks } from "./components/UserLinks";
import { TreePalm } from "lucide-react";

export default async function UserPage({ params }: { params: { username: string } }) {
    const { username } = await params;
    const user = await infoUserByUsername(username)

    if (!user) return <NotFoundUser />
    return (
        <div className="flex flex-col items-center justify-between gap-2 h-screen max-w-2xl mx-auto">
            {
                user.backgroundImage ? (
                    <Image
                        src={user.backgroundImage}
                        alt="Background image"
                        className="absolute top-0 left-0 w-full h-full"
                        layout="fill"
                        objectFit="cover"
                    />
                ) : (
                    <div className="absolute top-0 left-0 w-full h-full bg-[#E4E9ED]" />
                )
            }
            <div className="flex flex-col items-center gap-2 pt-28 w-full px-5 z-10">
                <Image
                    src={user.image || "/user.webp"}
                    alt="User image"
                    width={96}
                    height={96}
                    className="rounded-full aspect-square object-cover"
                />
                <div className="text-center">
                    <p className="text-xl font-semibold hover:underline transition-all duration-300 text-[#a80374]">@{user.username}</p>
                    <p className="text-sm text-slate-400">{user.name}</p>
                    <p className="mt-8 w-[300px] text-justify text-white">{user.bio}</p>
                </div>
                <UserLinks links={user.links} />
            </div>
            <div className="pb-5 z-10">
                <div className="flex gap-2 items-center justify-center py-2 px-5 bg-white rounded-full shadow-lg">
                    <TreePalm className="h-5 w-5" />
                    Linktree - Clone
                </div>
            </div>
        </div>
    )
}