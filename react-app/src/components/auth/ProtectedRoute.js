import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/*
This component acts as a gatekeeper for routes that need
user authentication
*/

const ProtectedRoute = props => {
  return (
    <Route {...props}>
      {(props.authenticated)? props.children  : <Redirect to='/' />}
    </Route>
  )
};


export default ProtectedRoute;
