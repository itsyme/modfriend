import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import PageLogin from "./pages/PageLogin"
import PageRegister from "./pages/PageRegister";

function App() {
  return (
    <>
    <BrowserRouter>
    <Switch>
    <Route exact path="/" component = {PageLogin}/>
    <Route exact path="/Register" component = {PageRegister} />
    </Switch>
    </BrowserRouter>
    </>
    
  );
}

export default App;
