import { data } from "@/utils";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useOpenLogin, useSetOpenLogin, useSetUser } from "./UserProvider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function LoginDialog() {
    const [username, setUsername] = useState(data.currentUser.username);
    const openLoginDialog = useOpenLogin();
    const setOpenLoginDialog = useSetOpenLogin();
    const setUser = useSetUser();
    const { toast } = useToast();
    function handleLogin() {
        if (!username) {
            toast({title: "Please input username", className: "bg-red-700 text-white border-none"})
            return;
        }
        if (username === data.currentUser.username) {
            const {
                currentUser: {
                    image: { png },
                },
            } = data;
            setUser((prev) => {
                prev.username = username;
                prev.avatar = png;
                return { ...prev };
            });
        } else {
            setUser((prev) => {
                prev.username = username;
                prev.avatar = null;
                return { ...prev };
            });
        }

        setOpenLoginDialog(false);
    }

    return (
        <Dialog
            open={openLoginDialog}
            onOpenChange={(e) => setOpenLoginDialog(e)}
        >
            <DialogContent>
                <DialogHeader className="font-semibold font-rubik">Login</DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-4 items-center">
                        <Label htmlFor="username-login-input">Username</Label>
                        <Input
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleLogin();
                                }
                            }}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="col-span-3"
                            id="username-login-input"
                            required
                        />
                    </div>
                    <div className="w-full flex justify-end">
                        <Button onMouseDown={handleLogin}>Enter</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
