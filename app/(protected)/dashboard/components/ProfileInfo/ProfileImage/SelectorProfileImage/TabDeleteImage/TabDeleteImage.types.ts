import { SetStateAction } from "react";

export type TabDeleteImageProps = {
    setShowDialog: React.Dispatch<SetStateAction<boolean>>,
    setShowTab: React.Dispatch<SetStateAction<"upload" | "delete" | null>>,
}