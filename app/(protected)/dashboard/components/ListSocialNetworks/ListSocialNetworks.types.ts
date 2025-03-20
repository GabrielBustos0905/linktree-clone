import { Link } from "@prisma/client"
import React, { SetStateAction } from "react"

export type ListSocialNetworksProps = {
    links: Link[],
    onReload: React.Dispatch<SetStateAction<boolean>>
}