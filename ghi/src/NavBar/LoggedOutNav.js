import React from 'react'
import { NavLink } from 'react-router-dom'


export default function LoggedOutNav() {
    return (
        <nav className="navbar navbar-expand-lg flex justify-between items-center w-full" style={{ backgroundColor: '#dab7de9f' }}>
            <div className="container-fluid mx-auto px-0 justify-between">
                <div className="flex space-x-4">
                    <NavLink to="/" activeclassname="active-link" className="text-white text-base font-bold px-4 py-2 hover:bg-pink-600 rounded flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-heart-fill" viewBox="0 0 16 16">
                            <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707L7.293 1.5Z" />
                            <path d="m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9.293Zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018Z" />
                        </svg>
                        Home
                    </NavLink>
                </div>
                <div className="flex space-x-4">
                    <NavLink to="/signup" activeclassname="active-link" className="text-white text-base font-bold px-4 py-2 hover:bg-pink-600 rounded flex items-center">
                        <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        Sign Up
                    </NavLink>
                </div>
                <div className="flex space-x-4">
                    <NavLink to="/login" activeclassname="active-link" className="text-white text-base font-bold px-4 py-2 hover:bg-pink-600 rounded flex items-center">
                        <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                        Log In
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}
