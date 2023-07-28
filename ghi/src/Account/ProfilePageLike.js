import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';
import { useNavigate } from "react-router-dom";
// import styles from "./styling/ProfilePage.css";

const PPL = () => {
    const { id: userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [currentUser, setCurrentUser] = useState("");
    const navigate = useNavigate();
    const { token } = useToken();

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

export default PPL;
