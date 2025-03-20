import { useState } from "react";
import { TabUploadImageProps } from "./TabUploadImage.types";
import { ChevronLeft } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useUser } from "@/hooks/use-user";
import { toast } from "sonner";

export function TabUploadImage(props: TabUploadImageProps) {
    const { setShowDialog, setShowTab } = props;
    const [photoUrl, setPhotoUrl] = useState("");

    const { reloadUser } = useUser();

    const onUploadImage = async () => {
        await axios.patch("/api/update-user", {
            image: photoUrl
        });
        setShowDialog(false);
        toast.success("User image updated!")
        reloadUser()
    };

    return (
        <div>
            <div
                className="flex gap-1 items-center text-sm cursor-pointer hover:bg-slate-100 p-1 w-fit rounded-lg"
                onClick={() => setShowTab(null)}
            >
                <ChevronLeft className="w-4 h-4" />
                Back
            </div>
            <div className="my-4">
                <UploadButton
                    className="rounded-md text-slate-800 bg-slate-200 h-full w-full p-4"
                    endpoint="profileImage"
                    onClientUploadComplete={(res) => {
                        setPhotoUrl(res?.[0].url)
                    }}
                    onUploadError={(error: Error) => {
                        console.log(error)
                    }}
                />
            </div>
            <div className="mt-6">
                <Button className="w-full bg-[#680148] hover:bg-[#680147bd]" onClick={onUploadImage} disabled={!photoUrl}>Continue</Button>
            </div>
        </div>
    )
}