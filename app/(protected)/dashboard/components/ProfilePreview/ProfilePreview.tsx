import { Lock } from "lucide-react";
import { ButtonHeader } from "./ButtonHeader";
import { ButtonCopy } from "./ButtonCopy";
import { PhonePreview } from "./PhonePreview";

export function ProfilePreview() {
    return (
        <div className="border-l-slate-200 border-[1px] border-transparent px-2">
            <ButtonHeader />
            <ButtonCopy />
            <PhonePreview />
            <div className="flex items-center justify-center mt-20">
                <div className="flex gap-1 items-center font-semibold cursor-pointer">
                    Hide Linktree logo
                </div>
                <Lock className="h-4 w-4" />
            </div>
        </div>
    )
}