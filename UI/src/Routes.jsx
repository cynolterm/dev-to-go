import React from "react";
import { Route, Switch } from "react-router-dom";

import App from "./App";
import MainPage from "./MainPage";
import UserPage from "./UserPage";

const Routes = () => (
    <App>
        <Switch>
            <Route path="/" component={MainPage} exact />
            <Route path="/user" component={UserPage} exact />
        </Switch>
    </App>
)

export default Routes;