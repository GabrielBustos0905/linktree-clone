"use client"

import { User, Link } from "@prisma/client";
import { useEffect, useState } from "react";
import { LoaderProfile } from "@/components/LoaderProfile";
import { StepConfigUserProvider } from "@/contexts";
import { TreePalm } from "lucide-react";
import { HandlerSteps } from "./components";

export default function DashboardPage() {
    const [isFirstVisit, setIsFirstVisit] = useState(false);
    const [reload, setReload] = useState(false);
    const [infoUser, setInfoUser] = useState<(User & { links: Link[] } | null)>(null);

    useEffect(() => {
        const checkFirstLogin = async () => {
            const response = await fetch("/api/info-user");
            const data = await response.json();
            setInfoUser(data);
            setIsFirstVisit(data.firstLogin);
        };
        checkFirstLogin();

        if (reload) {
            checkFirstLogin();
            setReload(false)
        }
    }, [reload]);

    if (!infoUser) {
        return <LoaderProfile />
    };

    if (isFirstVisit) {
        return (
            <StepConfigUserProvider>
                <HandlerSteps onReload={setReload} />
            </StepConfigUserProvider>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-[60%_auto] gap-4 px-4">
            <div>
                {/* <LinkProfile /> */}
                Link profile
                <div>
                    {/* <ProfileInfo onReload={setReload} /> */}
                    Profile info
                </div>
                {
                    infoUser.links.length > 0 ? (
                        // <ListSocialNetworks links={infoUser.links} onReload={setReload} />
                        <>List social NEtwork</>
                    ) : (
                        <div className="mt-20 flex flex-col itemx-center">
                            <div className="py-10 text-center justify-center flex flex-col items-center text-gray-400 font-semibold">
                                <TreePalm className="h-20 w-20" strokeWidth={1} />
                                <p>Show the world who you are.</p>
                                <p>Add a link to get started.</p>
                            </div>
                        </div>
                    )
                }
            </div>
            {/* <ProfilePreview /> */}
            <>Profile preview</>
        </div>
    )
}