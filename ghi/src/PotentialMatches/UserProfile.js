// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import useToken from '@galvanize-inc/jwtdown-for-react';
// import { useNavigate } from 'react-router-dom';
// import './styles/UserProfilePage.css';

// const UserProfile = () => {
//     const { id: userId } = useParams();
//     const [userData, setUserData] = useState(null);
//     const [currentUser, setCurrentUser] = useState("");
//     const navigate = useNavigate();
//     const { token } = useToken();

//     useEffect(() => {
//         if (!token) {
//             navigate("/login");
//         } else {
//             localStorage.setItem("token", token);
//         }
//     }, [navigate, token]);

//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await fetch(`http://localhost:8000/api/users/${userId}/`, {
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

//     const fetchCurrentUser = async () => {
//         const url = `http://localhost:8000/token/`;
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

//     const likeUser = async () => {
//         const loggedInUserId = currentUser.id;
//         const response = await fetch(`http://localhost:8000/likes/${loggedInUserId}/${userId}/`, {
//             method: "POST",
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 logged_in_user: loggedInUserId,
//                 matched_user: userId,
//                 mutual: false,
//                 match_timestamp: new Date().toISOString()
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

//     if (!userData) {
//         return <div>Loading..</div>
//     }

//     return (
//         <>
//             <div className="row py-5 px-4">
//                 <div className="col-md-9 mx-auto">
//                     <div className="profile-widget bg-white shadow rounded overflow-hidden">
//                         <div className="px-4 pt-0 pb-4 cover">
//                             <div className="media align-items-end profile-head">
//                                 <div className="profile mr-3">
//                                     <img
//                                         src={userData.picture}
//                                         alt='user'
//                                         className="rounded mb-2 img-thumbnail"
//                                     />
//                                 </div>
//                                 <div className="media-body mb-5 text-white">
//                                     <h4 className="mt-0 mb-0"> Name: {userData.username}</h4>
//                                     <h4 className="mt-0 mb-0"> Age: {userData.age}</h4>
//                                     <h4 className="mt-0 mb-0">MBTI: {userData.mbti}</h4>
//                                     <h4 className="mt-0 mb-0">Gender: {userData.gender}</h4>
//                                     <h4 className="mt-0 mb-0">Interests: {userData.interest}</h4>
//                                     <button onClick={likeUser} disabled={!currentUser}>Like</button>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="px-4 py-3">
//                             <h5 className="mb-0">Bio:</h5>
//                             <div className="p-4 rounded shadow-sm bg-light">
//                                 <p className="font-italic mb-0">{userData.bio}</p>
//                             </div>
//                         </div>
//                         <div>
//                             <button className="btn btn-secondary">
//                                 View My Likes
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// };
// export default UserProfile;



// import React from 'react';
// import { Link } from 'react-router-dom';
// import './styles/UserProfilePage.css';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import useToken from '@galvanize-inc/jwtdown-for-react';

// const UserProfile = () => {
//     const [matchedUser, setMatchedUser] = useState('');
//     const navigate = useNavigate();
//     const { token } = useToken();

//     useEffect(() => {
//         if (token) {
//             const storedUser = JSON.parse(localStorage.getItem('matchedUser'))
//             setMatchedUser(storedUser)
//         }
//     }, [])
//     // useEffect(() => {
//     //     localStorage.removeItem('matchedUser')
//     // }, [navigate])

//     return (
//         <>
//             <div className="row py-5 px-4">
//                 <div className="col-md-9 mx-auto">
//                     <div className="profile-widget bg-white shadow rounded overflow-hidden">
//                         <div className="px-4 pt-0 pb-4 cover">
//                             <div className="media align-items-end profile-head">
//                                 <div className="profile mr-3">
//                                     <img
//                                         src="https://picsum.photos/200"
//                                         alt="..."
//                                         // width="130"
//                                         style={{
//                                             width: "auto",
//                                             height: "auto"
//                                         }}
//                                         className="rounded mb-2 img-thumbnail"
//                                     />
//                                 </div>
//                                 <div className="media-body mb-5 text-white">
//                                     <h4 className="mt-0 mb-0"> Name: {matchedUser.username}</h4>
//                                     <h4 className="mt-0 mb-0"> Age: {matchedUser.age}</h4>
//                                     <h4 className="mt-0 mb-0">MBTI: {matchedUser.mbti}</h4>
//                                     <h4 className="mt-0 mb-0">Gender: {matchedUser.gender}</h4>
//                                     <h4 className="mt-0 mb-0">Interests: {matchedUser.interest}</h4>
//                                     <p className="small mb-4">
//                                         <i className="fas fa-map-marker-alt mr-2"></i>
//                                         {matchedUser.city}, {matchedUser.state}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="px-4 py-3">
//                             <h5 className="mb-0">Bio:</h5>
//                             <div className="p-4 rounded shadow-sm bg-light">
//                                 <p className="font-italic mb-0">{matchedUser.bio}</p>
//                             </div>
//                         </div>
//                         <div>
//                             <button className="btn btn-secondary">
//                                 View My Likes
//                             </button>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// };
// export default UserProfile;
