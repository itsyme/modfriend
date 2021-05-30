import { BrowserRouter } from "react-router-dom";
import AppShell from "../components/AppShell/AppShell";
import LoginBar from "../components/LoginBar/LoginBar";
import RegisterForm from "../components/RegisterForm/RegisterForm";

function PageLogin() {
    return (
        <>
        <AppShell />
        <p />
        <LoginBar />
        </>
    )
}

export default PageLogin;