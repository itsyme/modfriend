import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import PageLogin from "./pages/PageLogin"
import PageRegister from "./pages/PageRegister";
import PageMyProfile from "./pages/PageMyProfile";
import PageProfileCreation from "./pages/PageProfileCreation";
import PageProfileEdit from "./pages/PageProfileEdit";
import PageModSelect from "./pages/PageModSelect";
import PageNotifications from "./pages/PageNotifications";
import PageChat from "./pages/PageChat";
import PageMatch from "./pages/PageMatch";
import {AuthProvider} from './contexts/AuthContext';
import AppShell from "./components/AppShell/AppShell";
import AppShellUnauthed from './components/AppShellUnauthed';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from './config/firebase';

function App() {
  const [user] = useAuthState(auth);
  return (
    <>

    <BrowserRouter>
    <AuthProvider>
    {user ? <AppShell /> : <AppShellUnauthed /> }

  
        <Switch>
          <Route exact path="/" component={PageLogin} />
          <Route exact path="/Register" component={PageRegister} />
          <Route exact path="/MyProfile" component={PageMyProfile} />
          <Route exact path="/ProfileCreation" component={PageProfileCreation} />
          <Route exact path="/ProfileEdit" component={PageProfileEdit} />
          <Route exact path="/ModSelect" component={PageModSelect} />
          <Route exact path="/Notifications" component={PageNotifications} />
          <Route exact path="/Chat" component={PageChat} />
          <Route exact path="/Home" component={PageMatch} />
        </Switch>
        
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
