import { useStepConfig } from "@/hooks/use-step-config";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Progress } from "@radix-ui/react-progress";
import { StepOne } from "../StepOne";
import { StepTwo } from "../StepTwo";
import { StepThree } from "../StepThree";
import { StepFour } from "../StepFour";
import { Summary } from "../Summary";

interface HandlerStepsProps {
    onReload: React.Dispatch<React.SetStateAction<boolean>>
}

export function HandlerSteps(props: HandlerStepsProps) {
    const { onReload } = props;
    const [openDialog, setOpenDialog] = useState(true);
    const { totalSteps, step, previousStep } = useStepConfig();

    const progressValue = (step / totalSteps) * 100;

    const onCloseDialog = () => {
        onReload(true);
        setOpenDialog(false);
    };

    return (
        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogTrigger>Open</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {
                            step > 1 && step < 5 && (
                                <Button variant="outline" className="mr-2" onClick={previousStep}>
                                    Back <ArrowLeft />
                                </Button>
                            )
                        }
                        <div className="mb-2 text-center text-gray-500">
                            Step {step} of {totalSteps}
                        </div>
                        <Progress className="" value={progressValue} />
                    </AlertDialogTitle>
                    <AlertDialogDescription asChild>
                        <div>
                            {step === 1 && <StepOne />}
                            {step === 2 && <StepTwo />}
                            {step === 3 && <StepThree />}
                            {step === 4 && <StepFour />}
                            {step === 5 && <Summary onReload={onCloseDialog} />}
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}