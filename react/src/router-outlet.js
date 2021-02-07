import React from "react";
import { Route } from "react-router-dom";
import Dashboard from './pages/dashboard';
import Chat from "./pages/chat"
import Login from "./pages/login"
import Register from "./pages/register"

export default function Router_outlet() {
    return (
        <React.Fragment>
            <Route exact path="/" component={Dashboard}></Route>
            <Route exact path="/chat" component={Chat} />
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </React.Fragment>
    );
}
