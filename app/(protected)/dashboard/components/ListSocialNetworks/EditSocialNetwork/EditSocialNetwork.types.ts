import { Link } from "@prisma/client"
import{ SetStateAction } from "react"

export type EditSocialNetworkProps = {
    link: Link,
    onReload: React.Dispatch<SetStateAction<boolean>>
}