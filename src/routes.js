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
import Tasks from './views/tasks';
import Deliveries from './views/deliveries';

const AppRoutes = () => {
    return (
        <App>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/home" component={Dashboard}/>
                <Route path="/tasks" component={Tasks} />
                <Route path="/deliveries" component={Deliveries} />
                <Route path="/" component={Page404} />
            </Switch>
        </App>
    )
}

export default AppRoutes;