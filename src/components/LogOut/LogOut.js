import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom';
import NavBar from '../NavBar/NavBar'

const LogOut = () => {
    localStorage.clear("user_login")
    localStorage.clear("admin_login")
    alert("Hello")
    return(
        <>
            <Redirect to = '/'/>                       // Redirect To Dashboard
        </>
    )
}

export default LogOut