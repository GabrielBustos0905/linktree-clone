"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
// import { useSearchParams } from "next/navigation";
// import { signIn } from "@/auth";

export function Social() {
    // const searchParams = useSearchParams();
    // const callbackUrl = searchParams.get("callbackUrl");

    // const onClick = (provider: "google" | "github") => {
    //     signIn(provider, {
    //         callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT
    //     })
    // };

    return (
        <div className="grid grid-cols-2 w-full gap-x-2">
            <Button size="lg" className="w-full" variant="outline" onClick={() => { }}>
                <FcGoogle className="h-5 w-5" />
            </Button>
            <Button size="lg" className="w-full" variant="outline" onClick={() => { }}>
                <FaGithub className="h-5 w-5" />
            </Button>
        </div>
    )
}