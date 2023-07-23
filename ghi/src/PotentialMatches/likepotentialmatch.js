import React, { useEffect, useState, useCallback } from "react";
import useToken from '@galvanize-inc/jwtdown-for-react';
import { useNavigate } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ProfileCard from "./ProfileCard";

const PotentialMatches = () => {
    const [currentUser, setCurrentUser] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [compatibilityData, setCompatibilityData] = useState([]);
    const navigate = useNavigate();
    const { token } = useToken();

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

    const fetchAllUsers = async () => {
        const url = `http://localhost:8000/api/users`;
        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            const data = await response.json();
            setAllUsers(data);
        }
    };
    useEffect(() => {
        fetchAllUsers();
    }, []);

    const calculateCompatibilityScore = (mbti1, mbti2) => {
        const compatibilityChart = {
            "INFP": { "INFP": "GOOD", "ENFP": "GOOD", "INFJ": "GOOD", "ENFJ": "PERFECT", "INTJ": "GOOD", "ENTJ": "PERFECT", "INTP": "GOOD", "ENTP": "GOOD", "ISFP": "BAD", "ESFP": "BAD", "ISTP": "BAD", "ESTP": "BAD", "ISFJ": "BAD", "ESFJ": "BAD", "ISTJ": "BAD", "ESTJ": "BAD" },
            "ENFP": { "INFP": "GOOD", "ENFP": "GOOD", "INFJ": "PERFECT", "ENFJ": "GOOD", "INTJ": "PERFECT", "ENTJ": "GOOD", "INTP": "GOOD", "ENTP": "GOOD", "ISFP": "BAD", "ESFP": "BAD", "ISTP": "BAD", "ESTP": "BAD", "ISFJ": "BAD", "ESFJ": "BAD", "ISTJ": "BAD", "ESTJ": "BAD" },
            "INFJ": { "INFP": "GOOD", "ENFP": "PERFECT", "INFJ": "GOOD", "ENFJ": "GOOD", "INTJ": "GOOD", "ENTJ": "GOOD", "INTP": "GOOD", "ENTP": "PERFECT", "ISFP": "BAD", "ESFP": "BAD", "ISTP": "BAD", "ESTP": "BAD", "ISFJ": "BAD", "ESFJ": "BAD", "ISTJ": "BAD", "ESTJ": "BAD" },
            "ENFJ": { "INFP": "PERFECT", "ENFP": "GOOD", "INFJ": "GOOD", "ENFJ": "GOOD", "INTJ": "GOOD", "ENTJ": "GOOD", "INTP": "GOOD", "ENTP": "GOOD", "ISFP": "PERFECT", "ESFP": "BAD", "ISTP": "BAD", "ESTP": "BAD", "ISFJ": "BAD", "ESFJ": "BAD", "ISTJ": "BAD", "ESTJ": "BAD" },
            "INTJ": { "INFP": "GOOD", "ENFP": "PERFECT", "INFJ": "GOOD", "ENFJ": "GOOD", "INTJ": "GOOD", "ENTJ": "GOOD", "INTP": "GOOD", "ENTP": "PERFECT", "ISFP": "AVERAGE", "ESFP": "AVERAGE", "ISTP": "AVERAGE", "ESTP": "AVERAGE", "ISFJ": "POOR", "ESFJ": "POOR", "ISTJ": "POOR", "ESTJ": "POOR" },
            "ENTJ": { "INFP": "PERFECT", "ENFP": "GOOD", "INFJ": "GOOD", "ENFJ": "GOOD", "INTJ": "GOOD", "ENTJ": "GOOD", "INTP": "PERFECT", "ENTP": "GOOD", "ISFP": "AVERAGE", "ESFP": "AVERAGE", "ISTP": "AVERAGE", "ESTP": "AVERAGE", "ISFJ": "AVERAGE", "ESFJ": "AVERAGE", "ISTJ": "AVERAGE", "ESTJ": "AVERAGE" },
            "INTP": { "INFP": "GOOD", "ENFP": "GOOD", "INFJ": "GOOD", "ENFJ": "GOOD", "INTJ": "GOOD", "ENTJ": "PERFECT", "INTP": "GOOD", "ENTP": "GOOD", "ISFP": "AVERAGE", "ESFP": "AVERAGE", "ISTP": "AVERAGE", "ESTP": "AVERAGE", "ISFJ": "POOR", "ESFJ": "POOR", "ISTJ": "POOR", "ESTJ": "PERFECT" },
            "ENTP": { "INFP": "GOOD", "ENFP": "GOOD", "INFJ": "PERFECT", "ENFJ": "GOOD", "INTJ": "PERFECT", "ENTJ": "GOOD", "INTP": "GOOD", "ENTP": "GOOD", "ISFP": "AVERAGE", "ESFP": "AVERAGE", "ISTP": "AVERAGE", "ESTP": "AVERAGE", "ISFJ": "POOR", "ESFJ": "POOR", "ISTJ": "POOR", "ESTJ": "POOR" },
            "ISFP": { "INFP": "BAD", "ENFP": "BAD", "INFJ": "BAD", "ENFJ": "PERFECT", "INTJ": "AVERAGE", "ENTJ": "AVERAGE", "INTP": "AVERAGE", "ENTP": "AVERAGE", "ISFP": "POOR", "ESFP": "POOR", "ISTP": "POOR", "ESTP": "POOR", "ISFJ": "AVERAGE", "ESFJ": "PERFECT", "ISTJ": "AVERAGE", "ESTJ": "PERFECT" },
            "ESFP": { "INFP": "BAD", "ENFP": "BAD", "INFJ": "BAD", "ENFJ": "BAD", "INTJ": "AVERAGE", "ENTJ": "AVERAGE", "INTP": "AVERAGE", "ENTP": "AVERAGE", "ISFP": "POOR", "ESFP": "POOR", "ISTP": "POOR", "ESTP": "POOR", "ISFJ": "PERFECT", "ESFJ": "AVERAGE", "ISTJ": "PERFECT", "ESTJ": "AVERAGE" },
            "ISTP": { "INFP": "BAD", "ENFP": "BAD", "INFJ": "BAD", "ENFJ": "BAD", "INTJ": "AVERAGE", "ENTJ": "AVERAGE", "INTP": "AVERAGE", "ENTP": "AVERAGE", "ISFP": "POOR", "ESFP": "POOR", "ISTP": "POOR", "ESTP": "POOR", "ISFJ": "AVERAGE", "ESFJ": "PERFECT", "ISTJ": "AVERAGE", "ESTJ": "PERFECT" },
            "ESTP": { "INFP": "BAD", "ENFP": "BAD", "INFJ": "BAD", "ENFJ": "BAD", "INTJ": "AVERAGE", "ENTJ": "AVERAGE", "INTP": "AVERAGE", "ENTP": "AVERAGE", "ISFP": "POOR", "ESFP": "POOR", "ISTP": "POOR", "ESTP": "POOR", "ISFJ": "PERFECT", "ESFJ": "AVERAGE", "ISTJ": "PERFECT", "ESTJ": "AVERAGE" },
            "ISFJ": { "INFP": "BAD", "ENFP": "BAD", "INFJ": "BAD", "ENFJ": "BAD", "INTJ": "POOR", "ENTJ": "AVERAGE", "INTP": "POOR", "ENTP": "POOR", "ISFP": "AVERAGE", "ESFP": "PERFECT", "ISTP": "AVERAGE", "ESTP": "PERFECT", "ISFJ": "GOOD", "ESFJ": "GOOD", "ISTJ": "GOOD", "ESTJ": "GOOD" },
            "ESFJ": { "INFP": "BAD", "ENFP": "BAD", "INFJ": "BAD", "ENFJ": "BAD", "INTJ": "POOR", "ENTJ": "AVERAGE", "INTP": "POOR", "ENTP": "POOR", "ISFP": "PERFECT", "ESFP": "AVERAGE", "ISTP": "PERFECT", "ESTP": "AVERAGE", "ISFJ": "GOOD", "ESFJ": "GOOD", "ISTJ": "GOOD", "ESTJ": "GOOD" },
            "ISTJ": { "INFP": "BAD", "ENFP": "BAD", "INFJ": "BAD", "ENFJ": "BAD", "INTJ": "POOR", "ENTJ": "AVERAGE", "INTP": "POOR", "ENTP": "POOR", "ISFP": "AVERAGE", "ESFP": "PERFECT", "ISTP": "AVERAGE", "ESTP": "PERFECT", "ISFJ": "GOOD", "ESFJ": "GOOD", "ISTJ": "GOOD", "ESTJ": "GOOD" },
            "ESTJ": { "INFP": "BAD", "ENFP": "BAD", "INFJ": "BAD", "ENFJ": "BAD", "INTJ": "POOR", "ENTJ": "AVERAGE", "INTP": "PERFECT", "ENTP": "POOR", "ISFP": "PERFECT", "ESFP": "AVERAGE", "ISTP": "PERFECT", "ESTP": "AVERAGE", "ISFJ": "GOOD", "ESFJ": "GOOD", "ISTJ": "GOOD", "ESTJ": "GOOD" }
        }
        if (!(mbti1 in compatibilityChart) || !(mbti2 in compatibilityChart)) {
            return "Please enter a valid MBTI type.";
        }
        const strengthNumbMap = { "POOR": 1, "BAD": 2, "AVERAGE": 3, "GOOD": 4, "PERFECT": 5 }
        const rawScore = compatibilityChart[mbti1][mbti2]
        return strengthNumbMap[rawScore];
    }

    const getCompatibilityStrengthText = (strength) => {
        const strengthTextMap = {
            1: "POOR",
            2: "BAD",
            3: "AVERAGE",
            4: "GOOD",
            5: "PERFECT",
        };
        return strengthTextMap[strength] || "";
    };

    useEffect(() => {
        console.log("Current User:", currentUser);
        console.log("All users:", allUsers)

        if (currentUser && allUsers.users) {
            const potentialDataList = [];
            const compatData = allUsers.users
                .filter((user) => user.id !== currentUser.id)
                .map((user) => {
                    const compatibilityScore = calculateCompatibilityScore(
                        currentUser.mbti,
                        user.mbti
                    );
                    const potentialData = {
                        logged_in_user: currentUser.id,
                        match_id: null,
                        matched_user: user.id,
                        mbti_strength: compatibilityScore,
                        liked: false,
                    }
                    potentialDataList.push(potentialData);
                });
            potentialDataList.sort((a, b) => b.mbti_strength - a.mbti_strength);
            const topCompatibilityData = potentialDataList.slice(0, 5);
            console.log("lookhere:", potentialDataList)
            console.log("lookhere:", topCompatibilityData)
            setCompatibilityData(topCompatibilityData);

            const postCompatibilityData = async (data) => {
                const url = "http://localhost:8000/api/potential_matches";
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                    credentials: "include",
                });
            };
            const postData = Promise.all(topCompatibilityData.map((cData) => postCompatibilityData(cData)))
        }
    }, [currentUser, allUsers]);

    useEffect(() => {
        const getPotentialMatches = async () => {
            if (!currentUser || !currentUser.id) {
                // currentUser is not set or does not have an id yet
                return;
            }
            const url = `http://localhost:8000/api/potential_matches/${currentUser.id}`
            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                setCompatibilityData(data);
            } else {
                console.error("was not able to get")
            }
        };
        getPotentialMatches();
        console.log("fetch get request", getPotentialMatches())
    }, [currentUser]);

    const handleLike = async (userId) => {
        try {
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
                window.alert("You've Matched!");
            }
        } catch (error) {
            console.error('Error occurred while liking user:', error);
        }
    };

    const recentCompatibilityData = compatibilityData
        .sort((a, b) => new Date(b.created_on) - new Date(a.created_on))
        .slice(0, 5);
    console.log('RecentCompatData: ', recentCompatibilityData)


    return (
        <div style={{ maxWidth: "500px", marginLeft: "700px" }}>
            <h2>Potential Matches of the Week</h2>
            <div class="card">
                <Carousel style={{ marginBottom: "100px" }}>
                    {recentCompatibilityData.map((data) => (
                        <div key={data.match_id} className="card mb-4">
                            <div className="card-body">
                                <img className="card-img-top" src="https://picsum.photos/100" alt=" " />
                                <button onClick={() => handleLike(data.matched_user)} disabled={data.liked} style={{ transform: "translateY: 100px" }}>
                                    {data.liked ? "Liked" : "Like"}
                                </button>
                                <h5 className="card-title">Matched User: {data.matched_user}</h5>
                                <h6 style={{ marginTop: "10px" }} >Compatibility Strength: {getCompatibilityStrengthText(data.mbti_strength)}</h6>

                            </div>
                            <div>
                            </div>
                        </div>
                    ))}
                </Carousel >
            </div >
        </div >
    );
};

export default PotentialMatches;
