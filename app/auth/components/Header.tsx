import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { TreePalm } from "lucide-react";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
});

interface HeaderPops {
    label: string
};

export function Header({ label }: HeaderPops) {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn("text-3xl font-semibold flex items-center gap-2", font.className)}>
                <TreePalm width={40} height={40} className="text-slate-500" /> Linktree
            </h1>
            <p className="text-muted-foreground text-sm">{label}</p>
        </div>
    )
}