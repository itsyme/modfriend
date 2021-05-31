import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import PageLogin from "./pages/PageLogin"
import PageRegister from "./pages/PageRegister";
import PageMyProfile from "./pages/PageMyProfile";
import PageProfileCreation from "./pages/PageProfileCreation";
import PageModSelect from "./pages/PageModSelect";

function App() {
  return (
    <>
    <BrowserRouter>
    <Switch>
    <Route exact path="/" component = {PageLogin}/>
    <Route exact path="/Register" component = {PageRegister} />
    <Route exact path = "/MyProfile" component = {PageMyProfile} />
    <Route exact path = "/ProfileCreation" component = {PageProfileCreation} />
    <Route exact path = "/ModSelect" component = {PageModSelect} />
    </Switch>
    </BrowserRouter>
    </>
    
  );
}

export default App;
