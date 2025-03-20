import { useUser } from "@/hooks/use-user"
import { Palmtree } from "lucide-react";
import Image from "next/image";
import { ListSocialNetworks } from "./ListSocialNetworks";

export function PhonePreview() {
    const { user } = useUser();

    return (
        <div className="my-5">
            <div className="relative mx-auto border-white border-[5px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl">
                <div className="relative rounded-[2rem] overflow-hidden w-[290px] h-[590px]">
                    {
                        user?.backgroundImage ? (
                            <Image
                                src={user.backgroundImage}
                                alt="bakground-image"
                                layout="fill"
                                objectFit="cover"
                                className="absolute top-0 left-0 w-full h-full"
                            />
                        ) : (
                            <div className="absolute top-0 left-0 w-full h-full bg-[#e0eff1]" />
                        )
                    }
                    <div className="relative z-10 flex flex-col items-center p-6 justify-between h-full">
                        <Image
                            src={user?.image || "/default-avatar.webp"}
                            alt="avatar"
                            width={50}
                            height={50}
                            className="rounded-full object-cover aspect-square"
                        />
                        <p className="font-semibold text-lg mt-2 text-[#680148]">
                            {user?.username}
                        </p>
                        <div className="min-h-[70%]">
                            <ListSocialNetworks />
                        </div>
                        <div className="flex gap-1 items-center font-semibold">
                            Linktree Clone <Palmtree className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}