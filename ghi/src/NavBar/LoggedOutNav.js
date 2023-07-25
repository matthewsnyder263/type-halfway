import React from 'react';
import { Link, NavLink } from 'react-router-dom';


export default function LoggedOutNav() {
    return (
        <div>
            <header id="header">
                <h1>Type Halfway</h1>
                <nav className="links">
                    {/* Navigation links */}
                    <ul>
                        <li><a href="https://www.16personalities.com/free-personality-test">MBTI Test</a></li>
                        <li><a href="/">Home</a></li>
                        <li> <a href="/signup">Sign Up</a></li>
                        <li><a href="/login">Log In</a></li>
                    </ul>
                </nav>
                <nav className="main">
                    {/* Search and menu options */}
                    <ul>
                        <li className="menu">
                            <a className="fa-bars" href="#menu">Menu</a>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>

    );
}
