import React, { SetStateAction } from "react"

export type TabUploadImageProps = {
    setShowDialog: React.Dispatch<SetStateAction<boolean>>,
    setShowTab: React.Dispatch<SetStateAction<"upload" | "delete" | null>>,
}