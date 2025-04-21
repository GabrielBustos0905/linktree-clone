"use client"

import { Button } from "@/components/ui/button"
import { useUser } from "@/hooks/use-user";
import { useState } from "react"

export function LinkProfile() {
    const [isCopied, setIsCopied] = useState(false);
    const { user } = useUser()

    const copyLink = () => {
        const url = `${window.location.origin}/user/${user?.username}`;

        navigator.clipboard.writeText(url);

        setIsCopied(true)
    }

    return (
        <div className="bg-indigo-100 rounded-3xl">
            <div className="flex flex-col justify-center text-center py-4 px-4 items-center gap-2 md:flex-row md:justify-between md:text-left">
                <span className="text-sm">
                    <span>🔥 Your LinkTree is live:</span> {window.location.origin}/{user?.username}
                </span>
                <Button
                    className="rounded-full px-4 bg-white font-semibold text-xs md:text-[16px]"
                    variant={"outline"}
                    onClick={copyLink}
                >
                    {isCopied ? "Copied" : "Copy your link URL"}
                </Button>
            </div>
        </div>
    )
}