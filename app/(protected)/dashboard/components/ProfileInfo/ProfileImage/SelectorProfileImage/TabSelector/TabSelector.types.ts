import React, { SetStateAction } from "react"

export type TabSelectorProps = {
    setShowTab: React.Dispatch<SetStateAction<"upload" | "delete" | null>>
}