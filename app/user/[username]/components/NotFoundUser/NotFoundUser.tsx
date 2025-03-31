import { TreePalm } from "lucide-react";
import Link from "next/link";

export function NotFoundUser() {
    return (
        <div className="h-screen flex flex-col items-center justify-between">
            <div className="mt-40 text-center items-center flex flex-col gap-5">
                <TreePalm className="h-20 w-20 text-slate-700" />
                <p className="text-2xl">Yhe page you are looking for does not exist</p>
                <p>
                    Want this to be your username? {" "}
                    <Link href="/" className="underline">
                        Create your profile now
                    </Link>
                </p>
            </div>
            <div className="font-semibold pb-5 flex gap-2 items-center justify-center">
                Linktree - Clone <TreePalm className="h-5 w-5" />
            </div>
        </div>
    )
}