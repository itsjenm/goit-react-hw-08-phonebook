import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from 'redux/Users/selectors';


const PublicRoute = ({ children }) => {
    const login = useSelector(isLoggedIn);
  return (
    <div>
        {!login ? children : <Navigate to="/" />}
    </div>
  )
}

export default PublicRoute