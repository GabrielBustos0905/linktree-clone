import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { useState } from "react";

export function ButtonCopy() {
    const [isCopied, setIsCopied] = useState(false);
    const { user } = useUser();

    if (!user) return null;

    const copyProfile = () => {
        const url = `${window.location.origin}/user/${user.username}`;
        navigator.clipboard.writeText(url);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false)
        }, 2000);
    };

    return (
        <div className="pl6 mt-6">
            <div className="border py-2 rounded-full flex justify-between items-center">
                <span className="pl-5">
                    {window.location.origin}
                </span>
                <Button
                    className="bg-[#e0eff1] py-1 mx-2 text-black rounded-full font-semibold hover:bg-[#a2d5d6]"
                    onClick={copyProfile}
                >
                    {
                        isCopied ? "Copied" : "Copy"
                    }
                </Button>
            </div>
        </div>
    )
}