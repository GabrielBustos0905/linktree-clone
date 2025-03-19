import { Button } from "@/components/ui/button";
import { dataCreator } from "./StepOne.data";
import { useStepConfig } from "@/hooks/use-step-config";

export function StepOne() {
    const { nextStep, setInfoUser, infoUser } = useStepConfig();

    const handleClick = (value: string) => {
        setInfoUser((prevInfoUser) => ({
            ...prevInfoUser,
            typeUser: value
        }))
    };

    return (
        <div>
            <h2 className="text-center font-semibold text-2xl text-[#7db4b5]">
                Tell us about yourself
            </h2>
            <p className="text-center">This help us personalize your experience</p>
            <div className="grid grid-cols-1 gap-2 mt-4">
                {
                    dataCreator.map((data) => (
                        <button
                            key={data.value}
                            className={`flex flex-col items-center rounded-full border py-2 hover:bg-[#e0eff1] transition-all duration-300 focus:bg-[#e0eff1] ${infoUser.typeUser === data.value && "bg-[#e0eff1]"}`}
                            onClick={() => handleClick(data.value)}
                        >
                            {data.title}
                        </button>
                    ))
                }
            </div>
            <div className="mt-6">
                <Button className="w-full bg-[#680148] hover:bg-[#680147bd]" onClick={nextStep}>Continue</Button>
            </div>
        </div>
    )
}