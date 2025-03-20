import { ChevronLeft } from "lucide-react";
import { TabDeleteImageProps } from "./TabDeleteImage.types";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useUser } from "@/hooks/use-user";
import { toast } from "sonner";

export function TabDeleteImage(props: TabDeleteImageProps) {
    const { setShowDialog, setShowTab } = props;
    const { reloadUser } = useUser();

    const onRemoveImage = async () => {
        axios.patch("/api/update-user", {
            image: "https://pupg9bg1u4.ufs.sh/f/A2YaVsLjA0xgNAmHMsoHU7kyWx2f9VdIDBX0bAOu8aqJhsTw"
        });
        setShowDialog(false);
        toast.warning("Profile image removed!");
        reloadUser();
    };

    return (
        <div>
            <div
                className="flex gap-1 items-center text-sm cursor-pointer hover:bg-slate-100 p-1 w-fit rounded-lg"
                onClick={() => setShowTab(null)}
            >
                <ChevronLeft className="h-4 w-4" />
                Back
            </div>
            <div className="flex flex-col gap-2 mt-6">
                <Button className="w-full bg-[#680148] hover:bg-[#680147bd]" onClick={onRemoveImage}>Yes remove</Button>
                <Button variant="outline" className="rounded-full" onClick={() => setShowTab(null)}>Cancel</Button>
            </div>
        </div>
    )
}