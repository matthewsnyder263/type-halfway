import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import useToken from '@galvanize-inc/jwtdown-for-react';
import { useState, useEffect } from 'react';
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react"
import LoggedOutNav from './LoggedOutNav';
import LoggedInNav from './LoggedInNav';


export default function Nav() {
    const { logout, token } = useToken()
    const [currentUser, setCurrentUser] = useState()
    const { user } = useAuthContext()

    return (
        <nav className="navbar navbar-expand-lg flex justify-between items-center w-full" style={{ backgroundColor: 'rgba(200, 75, 150, 102)' }}>
            {token ? <LoggedInNav /> : <LoggedOutNav />}
        </nav>
    );
}
