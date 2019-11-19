import React from "react";
import {HashRouter as Router, Route, Link, Switch} from "react-router-dom";
import Loadable from "react-loadable";
// import Layout from "./layout";
import Loading from "../components/Loading";
import Home from '../pages/home';

const NotFound = Loadable({
    loader: () => import("Pages/404"),
    loading: Loading
});
const routes = [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/404",
        component: NotFound
    }
];
const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        render={props => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} />
        )}
    />
);

const RouteConfig = () => (
    <Router>
        <Switch>
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
            <Route
                component={infor => <NotFound location={infor.location} />}
            />
        </Switch>
    </Router>
);
export default RouteConfig;
