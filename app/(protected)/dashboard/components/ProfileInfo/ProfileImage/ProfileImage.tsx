import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@/hooks/use-user";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { SelectorProfileImage } from "./SelectorProfileImage";


export function ProfileImage() {
    const [showDialog, setShowDialog] = useState(false);
    const { user } = useUser()

    if (!user) return null;

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger className="text-left">
                <div className="relative">
                    <Image
                        src={user.image || "/user.webp"}
                        alt="Avatar"
                        width={63}
                        height={64}
                        className="rounded-full object-cover aspect-square"
                    />
                    <div className="bg-white rounded-full flex items-center justify-center border absolute right-[-5px] bottom-[-15px] p-1.5 cursor-pointer">
                        <Pencil className="text-slate-700 w-4 h-4" />
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Display name and bio</DialogTitle>
                    <DialogDescription asChild>
                        <SelectorProfileImage setShowDialog={setShowDialog} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}