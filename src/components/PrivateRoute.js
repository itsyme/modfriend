import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';

const PrivateRoute = ({component: Component, ...rest}) => {
    const {getUser} = useAuth();
    const isLoggedIn = getUser();
    console.log(isLoggedIn);

    return (
        <Route
        {...rest}
        render = {props =>
        isLoggedIn !== undefined ? (
            <Component {...props} />
        ) : (
            <Redirect to = {{pathname: '/', state: {from: props.location}}} />
        )
        }
        />
    )
}

export default PrivateRoute;