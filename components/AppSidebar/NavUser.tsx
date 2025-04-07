"use client"

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    LogOut,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { Link, User } from "@prisma/client"
import { logout } from "@/actions/logout"
import Image from "next/image"

export function NavUser() {
    const { isMobile } = useSidebar()

    const [infoUser, setInfoUser] = useState<(User & { links: Link[] } | null)>(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/info-user");
            const data = await response.json();
            setInfoUser(data);
        };
        fetchData();
    }, []);

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            {/* <Avatar className="h-8 w-8 rounded-lg"> */}
                            {/* <AvatarImage src={infoUser?.image || user.avatar} alt={infoUser?.name || ""} />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback> */}
                            <Image
                                src={infoUser?.image || "/user.webp"}
                                alt="avatar user"
                                width={26}
                                height={26}
                                className="object-cover rounded-full"
                            />
                            {/* </Avatar> */}
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{infoUser?.name}</span>
                                <span className="truncate text-xs">{infoUser?.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={infoUser?.image || "/user.webp"} alt="avatar" />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{infoUser?.name}</span>
                                    <span className="truncate text-xs">{infoUser?.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut />
                            <button onClick={logout}>
                                Log out
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
