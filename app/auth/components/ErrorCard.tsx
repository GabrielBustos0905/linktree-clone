import { FaExclamationTriangle } from "react-icons/fa";
import { CardWrapper } from "./CardWrapper";

export function ErrorCard() {
    return (
        <CardWrapper
            headerLabel="Ops! Something went weong!"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
        >
            <div className="w-full flex justify-center items-center">
                <FaExclamationTriangle className="text-destructive" />
            </div>
        </CardWrapper>
    )
}