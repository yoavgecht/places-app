import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import HomeComponent from '../components/HomeComponent';
import ListComponent from '../components/ListComponent';
import NotFound from '../components/NotFound';

const AppRouter = () => (
    <BrowserRouter>
    <div>
        <Switch>
            <Route path="/" component={HomeComponent} exact={true} />
            <Route path="/branches-list" component={ListComponent} exact={true}/>
            <Route component={NotFound} />
        </Switch>
     </div>
    </BrowserRouter>
)

export default AppRouter;
