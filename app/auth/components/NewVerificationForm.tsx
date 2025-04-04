"use client";

import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "./CardWrapper";
import { FormSuccess } from "@/components/FormSuccess";
import { FormError } from "@/components/FormError";



export function NewVerificationForm() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const token = useSearchParams().get("token");
    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError("Missing token!");
            return;
        };

        console.log(token)
        newVerification(token).then((data) => {
            setSuccess(data.success)
            setError(data.error)
        }).catch(() => {
            setError("Something went wrong!")
        })
    }, [token, success, error]);

    useEffect(() => {
        onSubmit()
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {
                    !success && !error && (
                        <BeatLoader />
                    )
                }
                <FormSuccess message={success} />
                {
                    !success && <FormError message={error} />
                }
                {/* <FormError message={error} /> */}
            </div>
        </CardWrapper>
    )
};