import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import PageLogin from "./pages/PageLogin"
import PageRegister from "./pages/PageRegister";
import PageMyProfile from "./pages/PageMyProfile";
import PageProfileCreation from "./pages/PageProfileCreation";
import PageModSelect from "./pages/PageModSelect";
import {AuthProvider} from './contexts/AuthContext'
//import RegisterForm from './components/RegisterForm'

function App() {

  return (
    <>
    
    <BrowserRouter>
    <AuthProvider>
        <Switch>
          <Route exact path="/" component={PageLogin} />
          <Route exact path="/Register" component={PageRegister} />
          <Route exact path="/MyProfile" component={PageMyProfile} />
          <Route exact path="/ProfileCreation" component={PageProfileCreation} />
          <Route exact path="/ModSelect" component={PageModSelect} />
        </Switch>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
