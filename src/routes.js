//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router'

//Components
import App from './App';

import Login from './views/login';
import Signup from './views/signup';
import Page404 from './views/page404';
import Dashboard from './views/dashboard';
import Subject from './views/subject';
import Delivery from './views/delivery';

const AppRoutes = () => {
    return (
        <App>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/home" component={Dashboard}/>
                <Route path="/subject" component={Subject} />
                <Route path="/deliveries" component={Delivery} />
                <Route path="/" component={Page404} />
            </Switch>
        </App>
    )
}

export default AppRoutes;