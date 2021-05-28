import { BrowserRouter } from "react-router-dom";
import AppShell from "../components/AppShell/AppShell";
import LoginBar from "../components/LoginBar/LoginBar";

function PageLogin() {
    return (
        <>
        <BrowserRouter>
        <AppShell />
      <p />
      <LoginBar />
      </BrowserRouter>
      </>
    )
}

export default PageLogin;