
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserProvider } from "./components/UserProvider.tsx";
import LoginDialog from "./components/LoginDialog.tsx";
import { Toaster } from "@/components/ui/toaster"


ReactDOM.createRoot(document.getElementById("root")!).render(
    <UserProvider>
        <App />
        <LoginDialog />
        <Toaster />
    </UserProvider>
);
