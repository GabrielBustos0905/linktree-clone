"use client"

import { Suspense } from "react";
import { NewVerificationForm } from "../components/NewVerificationForm";

export default function PageNewVerification() {
    return (
        <Suspense>
            <NewVerificationForm />
        </Suspense>
    )
}