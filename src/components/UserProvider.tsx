/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from "react";
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
    openLoginDialog: true,
    setOpenLoginDialog: unknown as React.Dispatch<
        React.SetStateAction<boolean>
    >,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState({
        username: null as null | string,
        avatar: null as null | string,
    });
    const [openLoginDialog, setOpenLoginDialog] = useState(true);

    return (
        <userContext.Provider
            value={{
                user,
                setUser,
                openLoginDialog,
                setOpenLoginDialog,
            }}
        >
            {children}
        </userContext.Provider>
    );
}

export const useUser = () => useContext(userContext).user;
export const useSetUser = () => useContext(userContext).setUser;

export const useOpenLogin = () => useContext(userContext).openLoginDialog;
export const useSetOpenLogin = () => useContext(userContext).setOpenLoginDialog;
