import { createContext, useState } from "react"
import { StepConfigUserProviderProps, StepConfigUserType } from "./StepConfigUser.types"

export const StepConfigUserContext = createContext<StepConfigUserType>({
    step: 1,
    setStep: () => { },
    infoUser: {
        name: "",
        typeUser: "",
        platforms: [],
        image: "",
        username: "",
    },
    setInfoUser: () => { },
    totalSteps: 5,
    nextStep: () => { },
    previousStep: () => { }
});

export function StepConfigUserProvider({ children }: StepConfigUserProviderProps) {
    const [step, setStep] = useState(1);
    const [infoUser, setInfoUser] = useState<StepConfigUserType["infoUser"]>({
        name: "",
        typeUser: "",
        platforms: [],
        image: "",
        username: ""
    });

    const nextStep = () => {
        setStep((prevStep) => prevStep + 1)
    };

    const previousStep = () => {
        setStep((prevStep) => prevStep - 1)
    };

    const totalSteps = 5;

    const data = {
        step,
        setStep,
        infoUser,
        setInfoUser,
        totalSteps,
        nextStep,
        previousStep,
    };

    return (
        <StepConfigUserContext.Provider value={data}>
            {children}
        </StepConfigUserContext.Provider>
    )
}