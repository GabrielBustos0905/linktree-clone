import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { dataSocialNetworks } from "@/data/social-networks";
import { useStepConfig } from "@/hooks/use-step-config";

export function StepTwo() {
    const { infoUser, setInfoUser, nextStep } = useStepConfig();
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
        infoUser?.platforms?.map((platform) => platform.name) || []
    );

    const handleSelectedPlatforms = (platform: string) => {
        setSelectedPlatforms((prevSelected) => {
            if (prevSelected.includes(platform)) {
                return prevSelected.filter((item) => item !== platform)
            } else {
                return [...prevSelected, platform]
            }
        })
    };

    const handleContinue = () => {
        setInfoUser((prevInfoUser) => ({
            ...prevInfoUser,
            platforms: dataSocialNetworks.filter(({ name }) => selectedPlatforms.includes(name))
        }));

        nextStep()
    }

    return (
        <div>
            <h2 className="text-center font-semibold text-2xl text-[#7db4b5]">Which platforms are you on?</h2>
            <p className="text-center">Pickup the one you are on</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 mt-4">
                {
                    dataSocialNetworks.map(({ icon, name }) => (
                        <div
                            key={name}
                            className={`flex flex-col gap-1 items-center rounded-lg py-3 hover:bg-[#e0eff1] transition-all duration-300 cursor-pointer ${selectedPlatforms.includes(name) && "bg-[#e0eff1]"}`}
                            onClick={() => handleSelectedPlatforms(name)}
                        >
                            <Image src={icon} alt="Icon" width={40} height={40} title={name} />
                            <p className="text-sm">{name}</p>
                        </div>
                    ))
                }
            </div>
            <div className="mt-6">
                <Button className="w-full bg-[#680148] hover:bg-[#680147bd]" onClick={handleContinue}>Continue</Button>
            </div>
        </div>
    )
}