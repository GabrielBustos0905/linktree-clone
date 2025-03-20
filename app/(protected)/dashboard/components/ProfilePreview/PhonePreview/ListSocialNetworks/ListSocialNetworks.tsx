import { useUser } from "@/hooks/use-user"
import Image from "next/image";

export function ListSocialNetworks() {
    const { links } = useUser();

    return (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {
                links?.map((link) => (
                    <li key={link.id}>
                        <a
                            href={link.link || ""}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Image
                                src={link.icon || ""}
                                alt="icon"
                                width={40}
                                height={40}
                            />
                        </a>
                    </li>
                ))
            }
        </ul>
    )
}