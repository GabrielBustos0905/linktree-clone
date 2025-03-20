import { createContext, useEffect, useState } from "react";
import { UserContextType, UserProviderProps } from "./UserContext.types";
import { Link, User } from "@prisma/client";

export const UserContext = createContext<UserContextType>({
    user: null,
    links: null,
    isLoading: false,
    reloadUser: () => { }
});

export function UserProvider({ children }: UserProviderProps) {

    const [infoUser, setInfoUser] = useState<User | null>(null);
    const [links, setLinks] = useState<Link[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserInfo = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/info-user");
            const data = await response.json();
            setInfoUser(data);
            setLinks(data.links || []);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchUserInfo()
    }, []);

    const reloadUser = () => fetchUserInfo();

    const data = {
        user: infoUser,
        links,
        isLoading,
        reloadUser
    };

    return <UserContext.Provider value={data}>
        {children}
    </UserContext.Provider>
}