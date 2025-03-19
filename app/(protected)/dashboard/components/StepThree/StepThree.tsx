import { Button } from "@/components/ui/button"
import { useStepConfig } from "@/hooks/use-step-config"
import Image from "next/image"

export function StepThree() {
    const { infoUser, setInfoUser, nextStep } = useStepConfig();

    const handleContinue = () => {
        const updatedPlatforms = infoUser.platforms.map(({ icon, name }) => {
            const input = document.getElementById(`${name}-input`) as HTMLInputElement;
            return {
                name,
                icon,
                link: input?.value || ""
            }
        });

        setInfoUser((prevInfoUser) => ({
            ...prevInfoUser,
            platforms: updatedPlatforms
        }));

        nextStep()
    }

    return (
        <div>
            <h2 className="text-center font-semibold text-2xl text-[#7db4b5]">
                Add your Links
            </h2>
            <p className="text-center">Complete the fields to add your Links</p>
            {
                infoUser.platforms.map(({ icon, link, name }) => (
                    <div key={name} className="flex items-center gap-2 mt-4">
                        <div className="flex flex-col gap-2 items-center">
                            <Image src={icon} alt="icon" title={name} width={40} height={40} />
                        </div>
                        <input
                            id={`${name}-input`}
                            type="text"
                            placeholder={`${name} link`}
                            className="w-full rounded-lg border p-2 text-sm"
                            defaultValue={link}
                        />
                    </div>
                ))
            }
            <div className="mt-6">
                <Button className="w-full bg-[#680148] hover:bg-[#680147bd]" onClick={handleContinue}>Continue</Button>
            </div>
        </div>
    )
}