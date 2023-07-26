import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import useToken from '@galvanize-inc/jwtdown-for-react';
import { useNavigate } from "react-router-dom";

export default function LoggedInNav() {
    const { logout } = useToken()
    const navigate = useNavigate()
    return (
        <nav className="navbar navbar-expand-lg flex justify-between items-center w-full" style={{ backgroundColor: '#dab7de9f' }}>
            <div className="container-fluid mx-auto px-0 justify-between">
                <div className="flex space-x-4">
                    <NavLink to="/" className="text-white text-base font-bold px-4 py-2 hover:bg-pink-600 rounded flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-heart-fill" viewBox="0 0 16 16">
                            <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707L7.293 1.5Z" />
                            <path d="m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9.293Zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018Z" />
                        </svg>
                        Home
                    </NavLink>
                </div>
                <div className="flex space-x-4">
                    <Link to="/potentialmatch" className="text-white text-base font-bold px-4 py-2 hover:bg-pink-600 rounded flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-activity" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z" />
                        </svg>
                        Potential Matches
                    </Link>
                </div>
                <div className="flex space-x-4">
                    <Link to="/matches" className="text-white text-base font-bold px-4 py-2 hover:bg-pink-600 rounded flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-through-heart-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l3.103-3.104a.5.5 0 1 1 .708.708L4.5 12.207V14a.5.5 0 0 1-.146.354l-1.5 1.5ZM16 3.5a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845.562 1.096.585 2.517-.213 4.092-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182A23.825 23.825 0 0 1 5.8 12.323L8.31 9.81a1.5 1.5 0 0 0-2.122-2.122L3.657 10.22a8.827 8.827 0 0 1-1.039-1.57c-.798-1.576-.775-2.997-.213-4.093C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2 12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5v3Z" />
                        </svg>
                        Matches
                    </Link>
                </div>
                <div className="flex space-x-4">
                    <Link to="/profile" className="text-white text-base font-bold px-4 py-2 hover:bg-pink-600 rounded flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                        </svg>
                        Profile
                    </Link>
                </div>
                <button
                    className="text-white text-base font-bold px-4 py-2 hover:bg-pink-600 rounded flex items-center"
                    onClick={async () => {
                        localStorage.removeItem("token");
                        logout();
                        navigate("/login");
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-closed-fill" viewBox="0 0 16 16">
                        <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                    </svg>
                    Logout
                </button>
            </div>
        </nav>
    );
}
