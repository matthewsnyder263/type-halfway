import React from 'react';
import { Link } from 'react-router-dom';
import './styling/ProfilePage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';
import "./ProfilePage.css";
import { useParams } from 'react-router-dom';
import instagram from "./images/Instagram_logo_2016.svg.webp";

const PP = () => {
    const { id: userId } = useParams();
    const [currentUser, setCurrentUser] = useState('');
    const navigate = useNavigate();
    const { token } = useToken();

    useEffect(() => {
        if (token) {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            setCurrentUser(storedUser);
            console.log("currentUser PROFILE", storedUser)
        } else {
            localStorage.removeItem("user");
            setCurrentUser(null);
            navigate('/login');

        }
    }, [token]);

    return (
        !currentUser ? <div>Loading...</div> :
            <>
                <div className="row py-5 px-4">
                    <div className="col-md-9 mx-auto">
                        <div className="profile-widget bg-white shadow rounded overflow-hidden">
                            <div className="px-4 pt-0 pb-4 cover">
                                <div className="media align-items-end profile-head">
                                    <div className="profile mr-3">
                                        <img
                                            src={currentUser.picture}
                                            alt="..."
                                            // width="130"
                                            style={{
                                                width: "auto",
                                                height: "auto"
                                            }}
                                            className="rounded mb-2 img-thumbnail"
                                        />
                                        <Link to="#" className="btn btn-outline-light btn-sm btn-block">
                                            Edit profile
                                        </Link>
                                    </div>
                                    <div className="col-row mb-5 text-white">
                                        <h2 className="mt-0 mb-0">{currentUser.username}</h2>
                                        <h2 className="mt-0 mb-0">{currentUser.age}</h2>
                                        <h2 className="mt-0 mb-0">{currentUser.mbti}</h2>
                                        <p className="small mb-4">
                                            <div>
                                                <h2 className="fas fa-map-marker-alt mr-2">
                                                    {currentUser.city}, {currentUser.state}
                                                </h2>
                                            </div>
                                            <br />
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="about wow fadeInUp" data-wow-delay="0.1s" id="about">
                                <div className="container-fluid" style={{ backgroundColor: '#dab7de9f' }}>
                                    <div className="row align-items-center">
                                        <div className="col-lg-6">
                                            <div className="about-img">
                                                <img src={currentUser.picture} alt="Image" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="about-content">
                                                <div className="section-header text-left">
                                                    <h2>A little about me</h2>
                                                </div>
                                                <div className="about-text">
                                                    <p>
                                                        {currentUser.bio}
                                                    </p>
                                                </div>
                                                <div className="section-header text-left">
                                                    <h2>My Interests</h2>
                                                </div>
                                                <div className="interests">
                                                    {currentUser.interest.split(",").map((interest, index) => (
                                                        <div className="interest-name" key={index}>
                                                            <p>{interest.trim()}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                                {/* <div className="skill-name">
                                        <p>Web Development</p>
                                        <p></p>
                                    </div>

                                    <div className="skill-name">
                                        <p>Apps Design</p>
                                        <p></p>
                                        </div>

                            <div className="py-4 px-4" style={{ backgroundColor: '#dab7de9f' }}>
                                <div className="d-flex align-items-center justify-content-between mb-6">
                                    <h5 className="mb-0">Recent photos</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="service" id="service">
                    <div className="container">
                        <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
                            <h2>Find Out More About me</h2>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.0s">
                                <div className="service-item">
                                    <div className="service-icon">
                                        {/* <i className="fa fa-laptop">{instagram}</i> */}
                                                <img src={instagram} alt="ig" />
                                            </div>
                                            <div className="service-text">
                                                <h3>instagram</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.2s">
                                        <div className="service-item">
                                            <div className="service-icon">
                                                <i className="fa fa-laptop-code"></i>
                                            </div>
                                            <div className="service-text">
                                                <h3>Web Development</h3>
                                                <p>
                                                    Lorem ipsum dolor sit amet elit. Phase nec preti mi. Curabi facilis ornare velit non
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.4s">
                                        <div className="service-item">
                                            <div className="service-icon">
                                                <i className="fab fa-android"></i>
                                            </div>
                                            <div className="service-text">
                                                <h3>Apps Design</h3>
                                                <p>
                                                    Lorem ipsum dolor sit amet elit. Phase nec preti mi. Curabi facilis ornare velit non
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.6s">
                                        <div className="service-item">
                                            <div className="service-icon">
                                                <i className="fab fa-apple"></i>
                                            </div>
                                            <div className="service-text">
                                                <h3>Apps Development</h3>
                                                <p>
                                                    Lorem ipsum dolor sit amet elit. Phase nec preti mi. Curabi facilis ornare velit non
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>;

                    </>
                    );
};
                    export default PP;
