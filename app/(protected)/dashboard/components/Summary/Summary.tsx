import { useStepConfig } from "@/hooks/use-step-config";
import { SummaryProps } from "./Summary.types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/Confetti";

export function Summary(props: SummaryProps) {
    const { onReload } = props;
    const { infoUser } = useStepConfig();
    const { name, platforms, typeUser, username, image } = infoUser;

    return (
        <div>
            <h2 className="text-center font-semibold text-2xl text-[#7db4b5]">
                Your Linktree is ready!
            </h2>
            <p className="text-center">Its time to share to the world</p>
            <div className="relative">
                <div className="flex justify-center mt-4">
                    <Image
                        src={image}
                        alt="Avatar"
                        title="Profile Avatar"
                        className="rounded-full border-4 border-white shadoww-xl aspect-square object-cover"
                        height={120}
                        width={120}
                    />
                </div>
                <div>
                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                        <p className="text-sm text-gray-500">@{username}</p>
                        <p className="text-sm text-gray-400">{typeUser}</p>
                    </div>
                    <div className="space-y-3 mt-4">
                        {
                            platforms?.map((platform) => (
                                <div key={platform.name} className="flex items-center gap-2">
                                    <Image
                                        src={platform.icon}
                                        alt="Platform icon"
                                        title="Platform icon"
                                        width={25}
                                        height={25}
                                    />
                                    <p className="text-sm font-semibold text-gray-700">{platform.name}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <Confetti />

                <div className="mt-6">
                    <Button className="w-full bg-[#680148] hover:bg-[#680147bd]" onClick={onReload}>Continue to the profile</Button>
                </div>
            </div>
        </div>
    )
}