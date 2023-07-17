import React, { useState, useEffect }from 'react';
import { useParams } from 'react-router-dom';
import styles from "./styling/ProfilePage.css";

const ProfilePage = () => {
    const { id: userId } = useParams();
    const [userData, setUserData] = useState(null);
    const currentUser = { id: 1 };


    useEffect(() => {
        const fetchData = async () => {
        const response = await fetch(`http://localhost:8000/api/users/${userId}`);
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            const text = await response.text();
            console.error(`Response text: ${text}`);
            return;
    }
        const data = await response.json();
        setUserData(data);
        };

        fetchData();
    }, [userId]);

    if (!userData) {
        return <div>Loading..</div>
    }

    const likeUser = async () => {
        const loggedInUserId = currentUser.id;  // DONT forget to add currentuser

        const response = await fetch(`http://localhost:8000/api/matches/${loggedInUserId}/${userId}`, {
            method: "POST",
        });

        if (!response.ok) {
            console.error(`Failed to like user: ${response.statusText}`);
            return;
        }

        const data = await response.json();
        console.log('User Has Been Liked.');
        console.log(data.message);
    };

    return (
        <div className="profile-container">
            <div className="profile-row">
                <div className="profile-column">
                    <img src={userData.picture} alt='user' />
                </div>
                <div className="profile-column">
                    <h1>{userData.mbti}</h1>
                    <p>***Gender Input Here*** | AGE: {userData.age}</p>
                    <button onClick={likeUser}>Like</button>
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
