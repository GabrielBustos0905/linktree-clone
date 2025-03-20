import { useUser } from "@/hooks/use-user";
import { RemoveSocialNetworkProps } from "./RemoveSocialNetwork.types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import axios from "axios";


export function RemoveSocialNetwork(props: RemoveSocialNetworkProps) {
    const { onReload, linkId } = props;
    const [showDialog, setShowDialog] = useState(false);
    const { reloadUser } = useUser();

    const onRemove = async () => {
        await axios.delete(`/api/update-user/social-networks/${linkId}`);
        onReload(true);
        setShowDialog(false);
        reloadUser();
    };

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
                <Button variant="destructive">
                    <Trash className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete social network</DialogTitle>
                    <Button className="w-full bg-[#680148] hover:bg-[#680147bd] rounded-full" onClick={onRemove}>Remove</Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}