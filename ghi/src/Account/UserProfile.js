import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';
import './ProfilePage.css';
import instagram from './images/Instagram_logo_2016.svg.webp';

const UserProfile = () => {
    const { userId } = useParams();
    console.log("userId from params:", userId);

    const [userData, setUserData] = useState(null);
    const [currentUser, setCurrentUser] = useState("");
    const navigate = useNavigate();
    const { token } = useToken();
    // const userId = Number(useParams().id);

    let currentUserId = null;
    useEffect(() => {
        const fetchCurrentUser = async () => {
            const url = `http://localhost:8000/token`;
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: "include",
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.account) {
                        setCurrentUser(data.account);
                        return data.account.id; // return the currentUserId
                    } else {
                        console.error("Received unexpected data:", data);
                    }
                } else {
                    console.error(`Request to ${url} failed with status code: ${response.status}`);
                }
            } catch (error) {
                console.error("Failed to fetch current user:", error);
            }
        };

        const fetchData = async (currentUserId) => { // add currentUserId as a parameter
            const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
                const text = await response.text();
                console.error(`Response text: ${text}`);
                return;
            }
            const data = await response.json();
            setUserData(data);
            // now you can use currentUserId here if needed
        };

        if (token) {
            fetchCurrentUser().then(currentUserId => fetchData(currentUserId)); // pass currentUserId to fetchData
        }
    }, [token, userId]);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            navigate("/login");
        } else {
            if (token) {
                localStorage.setItem("token", token);
            }
        }
    }, [navigate, token]);


    if (!userData) {
        return <div>Loading..</div>
    }



    const likeUser = async () => {
        const loggedInUserId = currentUser.id;

        const response = await fetch(`http://localhost:8000/likes/${loggedInUserId}/${userId}/`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                logged_in_user: loggedInUserId,
                matched_user: userId,
                mutual: false,
                match_timestamp: new Date().toISOString()
            })
        });



        if (!response.ok) {
            console.error(`Failed to like user: ${response.statusText}`);
            return;
        }

        const data = await response.json();
        console.log('User Has Been Liked.');
        console.log(data.message);

        if (data.message.includes("mutual")) {
            showMatchedPopup();
        }
    };

    const showMatchedPopup = () => {
        window.alert("You've Matched!");
    }

    return (
        <>
            <div className="hero" id="home">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-sm-12 col-md-6">
                            <div className="hero-content">
                                <div className="hero-text">
                                    <h1>{userData.full_name}</h1>
                                    <div className="typed-text">Web Designer, Web Developer, Front End Developer, Apps Designer, Apps Developer</div>
                                </div>
                                <div className="hero-btn">
                                    <a className="btn" href="#">{userData.mbti}</a>
                                    <a className="btn" href="#">{userData.age}</a>
                                    <div>
                                        <a className="btn" href="#">{userData.state}</a>
                                        <a className="btn" href="#">{userData.city}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 d-none d-md-block">
                            <div className="hero-image">
                                <img src={userData.picture} alt="Profile Image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about wow fadeInUp" data-wow-delay="0.1s" id="about">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about-img">
                                <img src={userData.picture} alt="Image" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-content">
                                <div className="section-header text-left">
                                    <h2>A little about me</h2>
                                </div>
                                <div className="about-text">
                                    <p>{userData.bio}</p>
                                </div>
                                <div className="section-header text-left">
                                    <h2>My Interests</h2>
                                </div>
                                <div className="interests">
                                    {userData.interest.split(",").map((interest, index) => (
                                        <div className="interest-name" key={index}>
                                            <p>{interest.trim()}</p>
                                        </div>
                                    ))}
                                </div>
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
                                    <img src={instagram} alt="ig" />
                                </div>
                                <div className="service-text">
                                    <h3>Instagram</h3>
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
                                    <p>Lorem ipsum dolor sit amet elit. Phase nec preti mi. Curabi facilis ornare velit non</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.4s">
                            <div className="service-item">
                                <div className="service-icon">
                                    <i className="fa fa-mobile-alt"></i>
                                </div>
                                <div className="service-text">
                                    <h3>App Development</h3>
                                    <p>Lorem ipsum dolor sit amet elit. Phase nec preti mi. Curabi facilis ornare velit non</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.6s">
                            <div className="service-item">
                                <div className="service-icon">
                                    <i className="fa fa-chart-line"></i>
                                </div>
                                <div className="service-text">
                                    <h3>Market Analysis</h3>
                                    <p>Lorem ipsum dolor sit amet elit. Phase nec preti mi. Curabi facilis ornare velit non</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button className="btn" onClick={likeUser}>Like</button>
            </div>
        </>
    );
}

export default UserProfile;
