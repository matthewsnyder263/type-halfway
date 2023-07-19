import React from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useContext } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

const ProfilePage = () => {
    const { logout } = useToken();
    const [currentUser, setCurrentUser] = useState("");
    const navigate = useNavigate();
    const { token } = useToken();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        if (!token) {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                navigate("/login");
            }
        }
    }, [navigate, token]);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        }
    }, [token]);

    const fetchCurrentUser = async () => {
        const url = `http://localhost:8000/token`;
        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            const data = await response.json();
            setCurrentUser(data.account);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, [token]);


    return (
        <>
            <div className="row py-5 px-4">
                <div className="col-md-9 mx-auto">
                    <div className="profile-widget bg-white shadow rounded overflow-hidden">
                        <div className="px-4 pt-0 pb-4 cover">
                            <div className="media align-items-end profile-head">
                                <div className="profile mr-3">
                                    <img
                                        src={currentUser.image}
                                        alt="..."
                                        width="130"
                                        className="rounded mb-2 img-thumbnail"
                                    />
                                    <Link
                                        to="#"
                                        className="btn btn-outline-light btn-sm btn-block"
                                    >
                                        Edit profile
                                    </Link>
                                    <button
                                        className="btn btn-outline-light btn-sm btn-block"

                                        onClick={handleLogout}
                                    >

                                        Logout
                                    </button>
                                </div>

                            </div>

                            <div className="media-body mb-5 text-white">
                                <h4 className="mt-0 mb-0">{currentUser.username}</h4>
                                <h4 className="mt-0 mb-0">{currentUser.age}</h4>
                                <h4 className="mt-0 mb-0">{currentUser.mbti}</h4>
                                <p className="small mb-4">
                                    <i className="fas fa-map-marker-alt mr-2"></i>
                                    {currentUser.city}, {currentUser.state}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 py-3">
                        <h5 className="mb-0">A little about me...</h5>
                        <div className="p-4 rounded shadow-sm bg-light">
                            <p className="font-italic mb-0">{currentUser.bio}</p>
                        </div>
                    </div>

                    <div className="py-4 px-4">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h5 className="mb-0">Recent photos</h5>
                            <Link to="#" className="btn btn-link text-muted">
                                Show all
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 mb-2 pr-lg-1">
                            <img
                                src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                                alt=""
                                className="img-fluid rounded shadow-sm"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 mb-2 pl-lg-1">
                        <img
                            src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                            alt=""
                            className="img-fluid rounded shadow-sm"
                        />
                    </div>
                </div>
            </div>
    </>
    );;
};
export default ProfilePage;
