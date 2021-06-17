import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {AuthProvider} from '../contexts/AuthContext';
import FirebaseAuth from 'firebase';

const PrivateRoute = ({component: Component, ...rest}) => {
    const isLoggedIn = AuthProvider.getInstance().getCurrentUser();
    console.log(isLoggedIn);

    return (
        <Route
        {...rest}
        render = {props =>
        isLoggedIn != undefined ? (
            <Component {...props} />
        ) : (
            <Redirect to = {{pathname: '/', state: {from: props.location}}} />
        )
        }
        />
    )
}

export default PrivateRoute;