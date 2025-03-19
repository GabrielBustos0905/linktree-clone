import React from "react";

export type StepConfigUserType = {
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    infoUser: InfoUserType;
    setInfoUser: React.Dispatch<React.SetStateAction<InfoUserType>>;
    totalSteps: number;
    nextStep: () => void;
    previousStep: () => void;
}

type InfoUserType = {
    name: string,
    typeUser: string;
    platforms: {
        icon: string;
        link: string;
        name: string;
    }[];
    image: string;
    username: string;
}

export type StepConfigUserProviderProps = {
    children: React.ReactNode
}