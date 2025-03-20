import { useState } from "react";
import { EditBackgroundProps } from "./EditBackground.types";
import { useUser } from "@/hooks/use-user";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Ellipsis, ImagePlus } from "lucide-react";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import axios from "axios";

export function EditBackground(props: EditBackgroundProps) {
    const { onReload } = props;
    const [showDialog, setShowDialog] = useState(false);
    const [photoUrl, setPhotoUrl] = useState("");

    const { reloadUser } = useUser();

    const onBackgroundChange = async () => {
        await axios.patch("/api/update-user", {
            backgroundImage: photoUrl
        });
        setShowDialog(false);
        onReload(true);
        reloadUser();
        setPhotoUrl("")
    };

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="p-2 bg-[#e0e2d9] rounded-full">
                        <Ellipsis fill="black" strokeWidth={1} />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <DialogTrigger>
                            <div className="flex gap-1 items-center">
                                <ImagePlus className="h-4 w-4" />
                                Edit or add backgroung
                            </div>
                        </DialogTrigger>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change background</DialogTitle>
                    <div className="pt-6">
                        {
                            photoUrl ? (
                                <div className="flex justify-center">
                                    <Image
                                        src={photoUrl}
                                        alt="background"
                                        width={300}
                                        height={300}
                                    />
                                </div>
                            ) : (
                                <UploadButton
                                    className="rounded-md text-slate-800 bg-slate-200 h-full py-10"
                                    endpoint="profileImage"
                                    onClientUploadComplete={(res) => {
                                        setPhotoUrl(res?.[0].url)
                                    }}
                                    onUploadError={(error: Error) => console.log(error)}
                                />
                            )
                        }
                    </div>
                    <Button className="w-full bg-[#680148] hover:bg-[#680147bd]" onClick={onBackgroundChange} disabled={!photoUrl}>Continue</Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}