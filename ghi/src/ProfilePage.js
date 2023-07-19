import React, { useState, useEffect }from 'react';
import { useParams } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';
import { useNavigate } from "react-router-dom";
import styles from "./styling/ProfilePage.css";

const ProfilePage = () => {
    const { id: userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [currentUser, setCurrentUser] = useState("");
    const navigate = useNavigate();
    const { token } = useToken();

    const fetchCurrentUser = async () => {
        const url = `http://localhost:8000/api/token`;
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

    useEffect(() => {
        fetchCurrentUser();
    }, []);

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

    useEffect(() => {
        const fetchData = async () => {
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
        };

        const storedUser = localStorage.getItem('userData');
        if (storedUser) {
            try {
                setCurrentUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse user data from localStorage:', error);
            }
        }
        fetchData();
    }, [userId, token]);

    if (!userData) {
        return <div>Loading..</div>
    }

    const likeUser = async () => {
        const loggedInUserId = currentUser.id;

        const response = await fetch(`http://localhost:8000/likes/${loggedInUserId}/${userId}`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                logged_in_user: loggedInUserId,
                matched_user: userId,
                mutual: false
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
        <div className="profile-container">
            <div className="profile-row">
                <div className="profile-column">
                    <img src={userData.picture} alt='user' />
                </div>
                <div className="profile-column">
                    <h1>{userData.mbti}</h1>
                    <p>***Gender Input Here*** | AGE: {userData.age}</p>
                    <button onClick={likeUser} disabled={!currentUser}>Like</button>
                </div>
            </div>
            <div className="profile-row">
                <div className="profile-column">
                    <p>{userData.bio}</p>
                </div>
            </div>
            <div className="profile-row">
                <div className="profile-column">
                    <p>***Interests: Input Interests Here***</p>
                </div>
                <div className="profile-column">
                    <p>***Social Media Links Here***</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;




// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import useToken from '@galvanize-inc/jwtdown-for-react';
// import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
// // import './ProfilePage.css';

// const ProfilePage = () => {
//     const { id: userId } = useParams();
//     const [userData, setUserData] = useState(null);
//     const [currentUser, setCurrentUser] = useState(null);
//     const navigate = useNavigate();
//     const { token, logout } = useToken();

//     const fetchCurrentUser = async () => {
//         const url = `http://localhost:8000/api/token`;
//         try {
//             const response = await fetch(url, {
//                 method: "GET",
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 },
//                 credentials: "include",
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 if (data && data.account) {
//                     setCurrentUser(data.account);
//                 } else {
//                     console.error("Received unexpected data:", data);
//                 }
//             } else {
//                 console.error(`Request to ${url} failed with status code: ${response.status}`);
//             }
//         } catch (error) {
//             console.error("Failed to fetch current user:", error);
//         }
//     };

//     useEffect(() => {
//         fetchCurrentUser();
//     }, []);

//     useEffect(() => {
//         const storedToken = localStorage.getItem("token");
//         if (!storedToken) {
//             navigate("/login");
//         } else {
//             if (token) {
//                 localStorage.setItem("token", token);
//             }
//         }
//     }, [navigate, token]);

//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             if (!response.ok) {
//                 console.error(`HTTP error! status: ${response.status}`);
//                 const text = await response.text();
//                 console.error(`Response text: ${text}`);
//                 return;
//             }
//             const data = await response.json();
//             setUserData(data);
//         };

//         fetchData();
//     }, [userId, token]);

//     if (!userData) {
//         return <div>Loading..</div>
//     }

//     const likeUser = async () => {
//         const loggedInUserId = currentUser.id;

//         const response = await fetch(`http://localhost:8000/likes/${loggedInUserId}/${userId}`, {
//             method: "POST",
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 logged_in_user: loggedInUserId,
//                 matched_user: userId,
//                 mutual: false
//             })
//         });

//         if (!response.ok) {
//             console.error(`Failed to like user: ${response.statusText}`);
//             return;
//         }

//         const data = await response.json();
//         console.log('User Has Been Liked.');
//         console.log(data.message);

//         if (data.message.includes("mutual")) {
//             showMatchedPopup();
//         }
//     };

//     const showMatchedPopup = () => {
//         window.alert("You've Matched!");
//     }

//     const handleLogout = () => {
//         logout();
//         navigate("/login");
//     };

//     return (
//         <div className="row py-5 px-4">
//             <div className="col-md-9 mx-auto">
//                 <div className="profile-widget bg-white shadow rounded overflow-hidden">
//                     <div className="px-4 pt-0 pb-4 cover">
//                         <div className="media align-items-end profile-head">
//                             <div className="profile mr-3">
//                                 <img
//                                     src={userData.picture}
//                                     alt="..."
//                                     width="130"
//                                     className="rounded mb-2 img-thumbnail"
//                                 />
//                                 <Link to="#" className="btn btn-outline-light btn-sm btn-block">
//                                     Edit profile
//                                 </Link>
//                                 <button className="btn btn-outline-light btn-sm btn-block" onClick={handleLogout}>Logout</button>
//                             </div>

//                             <div className="media-body mb-5 text-white">
//                                 <h4 className="mt-0 mb-0">{userData.mbti}</h4>
//                                 <p className="small mb-4">
//                                     ***Gender Input Here*** | AGE: {userData.age}
//                                 </p>
//                                 <button onClick={likeUser} disabled={!currentUser}>Like</button>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="px-4 py-3">
//                         <h5 className="mb-0">About Me</h5>
//                         <div className="p-4 rounded shadow-sm bg-light">
//                             <p className="font-italic mb-0">{userData.bio}</p>
//                         </div>
//                     </div>

//                     <div className="py-4 px-4">
//                         <div className="d-flex align-items-center justify-content-between mb-3">
//                             <h5 className="mb-0">Interests</h5>
//                             <Link to="#" className="btn btn-link text-muted">
//                                 Show all
//                             </Link>
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="col-lg-6 mb-2 pr-lg-1">
//                             <img
//                                 src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
//                                 alt=""
//                                 className="img-fluid rounded shadow-sm"
//                             />
//                         </div>
//                     </div>
//                     <div className="col-lg-6 mb-2 pl-lg-1">
//                         <img
//                             src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
//                             alt=""
//                             className="img-fluid rounded shadow-sm"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;
