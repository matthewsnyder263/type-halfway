import React from 'react';
import { Link } from 'react-router-dom';
import './ProfilePage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';

const ProfilePage = () => {
    // SNYDER CODE ADDED BELOW<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    // const { id: userId } = useParams();
    // const [userData, setUserData] = useState(null);
    // SNYDER CODE ADDED ABOVE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    const [currentUser, setCurrentUser] = useState('');
    const navigate = useNavigate();
    const { token, logout } = useToken();

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

    // // >>>>>>SNYDER CODE ADDED BELOW FOR LIKE USER<<<<<<<<

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         });
    //         if (!response.ok) {
    //             console.error(`HTTP error! status: ${response.status}`);
    //             const text = await response.text();
    //             console.error(`Response text: ${text}`);
    //             return;
    //         }
    //         const data = await response.json();
    //         setUserData(data);
    //     };

    //     const storedUser = localStorage.getItem('userData');
    //     if (storedUser) {
    //         try {
    //             setCurrentUser(JSON.parse(storedUser));
    //         } catch (error) {
    //             console.error('Failed to parse user data from localStorage:', error);
    //         }
    //     }
    //     fetchData();
    // }, [userId, token]);

    // if (!userData) {
    //     return <div>Loading..</div>
    // }

    // const likeUser = async () => {
    //     const loggedInUserId = currentUser.id;

    //     const response = await fetch(`http://localhost:8000/likes/${loggedInUserId}/${userId}`, {
    //         method: "POST",
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             logged_in_user: loggedInUserId,
    //             matched_user: userId,
    //             mutual: false
    //         })
    //     });



    //     if (!response.ok) {
    //         console.error(`Failed to like user: ${response.statusText}`);
    //         return;
    //     }

    //     const data = await response.json();
    //     console.log('User Has Been Liked.');
    //     console.log(data.message);

    //     if (data.message.includes("mutual")) {
    //         showMatchedPopup();
    //     }
    // };

    // const showMatchedPopup = () => {
    //     window.alert("You've Matched!");
    // }

    // // >>>>>>>>>>>>>>>>>>>>>>>>>SNYDER CODE ADDED ABOVE<<<<<<<<<<<<<<<<<<<<<

    // useEffect(() => {
    //     console.log("currentUser", currentUser);
    // }, [currentUser]);


    return (
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
                                {/* SNYDER CODE ADDED BELOW */}
                                {/* <div className="profile-column">
                                    <h1>{userData.mbti}</h1>
                                    <p>***Gender Input Here*** | AGE: {userData.age}</p>
                                    <button onClick={likeUser} disabled={!currentUser}>Like</button>
                                </div> */}
                                {/* SNYDER CODE ADDED ABOVE */}

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
            </div>
        </>
    )
};
export default ProfilePage;
