import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import AddImg from "./components/pages/Addimg";
import Home from "./components/pages/Home";
import RegisterUser from "./components/pages/Register";
import Login from "./components/pages/Login";
import UserState from './components/auth/AuthState';
import AuthToken from './components/auth/TokenAuth';

if(localStorage.token){
  AuthToken(localStorage.token);
}

function App() {
  return (
    <UserState>
  
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
             <Route exact path="/addimg" component={AddImg} /> 
             <Route exact path="/" component={Home} /> 
            <Route exact path="/register" component={RegisterUser} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Fragment>
      </Router>
  
     </UserState>
    
  );
}

export default App;