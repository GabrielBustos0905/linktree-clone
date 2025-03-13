import { TreePalm } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-full intems-center justify-between ">
            <div className="h-full w-full flex items-center justify-center">
                {children}
            </div>

            <div className="h-full w-full flex gap-4 items-center justify-center bg-linear-to-r from-[#e0eff1] to-[#7db4b5] border-l-2">
                <TreePalm width={60} height={60} className="text-slate-500" />
                <p className="text-2xl font-semibold">Linktree-Clone</p>
            </div>
        </div >
    )
}