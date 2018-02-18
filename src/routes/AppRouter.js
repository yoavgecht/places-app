import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import HeaderComponent from '../components/HeaderComponent';
import ShowPlacesComponent from '../components/show-places/ShowPlacesComponent';
import AddPlacesComponent from '../components/add-places/AddPlacesComponent';
import ListComponent from '../components/show-places/ListComponent';
import NotFound from '../components/show-places/NotFound';
import FooterComponent from '../components/FooterComponent';

const AppRouter = () => (
    <Grid>
    <HeaderComponent />
    <BrowserRouter>
        <Switch>
            <Route path="/" component={ShowPlacesComponent} exact={true} />
            <Route path="/add-destinations" component={AddPlacesComponent} exact={true}/>
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
    <FooterComponent />
    </Grid>
)

export default AppRouter;
