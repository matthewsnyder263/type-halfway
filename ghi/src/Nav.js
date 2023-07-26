import React from 'react'
import useToken from '@galvanize-inc/jwtdown-for-react';
import LoggedOutNav from './LoggedOutNav';
import LoggedInNav from './LoggedInNav';


export default function Nav() {
    const { token } = useToken()
    return (
        <nav className="navbar navbar-expand-lg flex justify-between items-center w-full" style={{ backgroundColor: '#dab7de9f' }}>

            {token ? <LoggedInNav /> : <LoggedOutNav />}
        </nav>
    );
}
