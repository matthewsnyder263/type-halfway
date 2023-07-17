import React from 'react';
// import { Link, NavLink } from
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-pink-500 flex justify-between items-center w-full">
            <div className="container-fluid mx-auto px-0 justify-between">
                <div className="flex space-x-4">
                    <NavLink to="/" className="text-white text-base font-bold px-4 py-2 hover:bg-pink-600 rounded flex items-center">
                        <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                        Home
                    </NavLink>
                </div>
                <div className="flex space-x-4">
                    <Link href="#" className="text-white text-base font-bold px-4 py-2 hover:bg-pink-600 rounded flex items-center">
                        <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        Matches
                    </Link>
                </div>
                <div className="flex space-x-4">
                    <a href="#" className="text-white text-base font-bold px-4 py-2 hover:bg-pink-600 rounded flex items-center">
                        <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4H4a1 1 0 00-1 1v14a1 1 0 001 1h16a1 1 0 001-1V5a1 1 0 00-1-1h-6l-2-2m-4 0L5 4h14zm-9 6h4m0 4h4m-4-8h4m0 4h4m-4 4h4m0-8h4m0 12H5v-6h4v2zm6 0h4v-2h-4v2zm0-4v-2h4v2h-4zm0 4h4v-2h-4v2z" />
                        </svg>
                        Profile
                    </a>
                </div>
                <div className="flex space-x-4">
                    <Link to="/signup" className="text-white text-base font-bold px-4 py-2 hover:bg-pink-600 rounded flex items-center">
                        <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                        Sign Up
                    </Link>
                </div>
                <div className="flex space-x-4">
                    <Link to="/login" className="text-white text-base font-bold px-4 py-2 hover:bg-pink-600 rounded flex items-center">
                        <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        Log In
                    </Link>
                </div>
            </div>
        </nav>
    );
}
