"use client"

import * as React from "react"
import { ChevronsUpDown, TreePalm } from "lucide-react"

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export function TeamSwitcher() {

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        {/* <activeTeam.logo className="size-4" /> */}
                        <TreePalm className="size-6" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                            Linktree-Clone
                        </span>
                        <span className="truncate text-xs">Enterprise</span>
                    </div>
                    <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
