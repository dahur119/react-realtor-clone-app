import Spinner from './spinner';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import {useAuthStatus}  from '../hooks/useAuthStatus';

export default function PrivateRoute() {
    const {loggedIn, checkingStatus}  = useAuthStatus();
    if(checkingStatus){
        return <h1><Spinner/></h1>
    }

  return  loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}