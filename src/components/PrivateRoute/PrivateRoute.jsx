import React from 'react';
import { useSelector } from 'react-redux';
import { isLoggedIn } from 'redux/Users/selectors';
import { Navigate } from 'react-router-dom';

// We need to create a react component to redirect someone if this component gets rendered 

export default function PrivateRoute({ children }) {
    // assign a variable to the isLoggedIn selector to check whether someone logged in
    const login = useSelector(isLoggedIn);
    // console.log(login);

  return (
    <div>{login ? children : <Navigate to="/login" />}</div>
  )
}

