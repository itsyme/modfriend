import React, { Fragment } from "react";
import './App.css';

import LoginPage from "./LoginPage.js";
import Taskbar from "./Taskbar.js";

function App() {
  return (
    <React.Fragment>
      <Taskbar />
      <LoginPage />
    </React.Fragment>
    
  );
}

export default App;
