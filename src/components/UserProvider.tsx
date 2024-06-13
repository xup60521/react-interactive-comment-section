/* eslint-disable react-refresh/only-export-components */
import { data } from "@/utils";
import { createContext, useContext, useEffect, useState } from "react";
import { unknown } from "zod";
const userContext = createContext({
    user: {
        username: null as null | string,
        avatar: null as null | string,
    },
    setUser: unknown as React.Dispatch<
        React.SetStateAction<{
            username: null | string;
            avatar: null | string;
        }>
    >,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState({
        username: null as null | string,
        avatar: null as null | string,
    });

    useEffect(() => {
        const {
            currentUser: {
                username,
                image: { png },
            },
        } = data;
        setUser({
            username,
            avatar: png,
        });
    }, []);

    return (
        <userContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </userContext.Provider>
    );
}

export const useUser = () => useContext(userContext).user;
export const useSetUser = () => useContext(userContext).setUser;
