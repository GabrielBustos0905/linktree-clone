"use client"
import { Suspense } from "react";
import { NewPasswordForm } from "../components/NewPasswordForm";

export default function NewPasswordPage() {
    return (
        <Suspense>
            <NewPasswordForm />
        </Suspense>
    )
}