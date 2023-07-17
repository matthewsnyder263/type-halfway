import React, { useEffect, useState, useCallback } from "react";
import useToken from '@galvanize-inc/jwtdown-for-react';
import { useNavigate } from "react-router-dom";

const PotentialMatches = () => {
    const [currentUser, setCurrentUser] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [compatibilityData, setCompatibilityData] = useState([]);
    const [lastCalculationDate, setLastCalculationDate] = useState(null);
    const [createdDate, setCreatedDate] = useState("");
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
            "ENFP": { "INFP": "GOOD", "ENFP": "GOOD", "INFJ": "PERFECT", "ENFJ": "GOOD", "INTJ": "PERFECT", "ENTJ":
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
        // Retrieve the createdDate from local storage on component mount
        const storedCreatedDate = localStorage.getItem(`createdDate_${currentUser.id}`);
        if (storedCreatedDate) {
            setCreatedDate(storedCreatedDate);
        }
    }, [currentUser]);

    const handlePotentialMatchesRequest = () => {
        const storageKey = `createdDate_${currentUser.id}`;

        if (!createdDate || isSevenDaysPassed(createdDate)) {
            const currentDate = new Date().toISOString();
            setCreatedDate(currentDate);

            // Store the createdDate in local storage
            localStorage.setItem(storageKey, currentDate);

            if (currentUser && allUsers?.users.length > 0) {
                const compatData = allUsers.users
                    .filter((user) => user.id !== currentUser.id)
                    .map((user) => {
                        const compatibilityScore = calculateCompatibilityScore(
                            currentUser.mbti,
                            user.mbti
                        );
                        return {
                            user,
                            strength: compatibilityScore,
                        };
                    });
                compatData.sort((a, b) => b.strength - a.strength);
                const topCompatibilityData = compatData.slice(0, 5);
                setCompatibilityData(topCompatibilityData);

                // Store the compatibility data in local storage
                localStorage.setItem("compatibilityData", JSON.stringify(topCompatibilityData));
            }
        } else {
            // Compatibility data is already available in local storage
            const storedCompatibilityData = localStorage.getItem("compatibilityData");
            if (storedCompatibilityData) {
                setCompatibilityData(JSON.parse(storedCompatibilityData));
            }
        }
    };

    const isSevenDaysPassed = (createdDate) => {
        const createdTime = new Date(createdDate).getTime();
        const currentTime = new Date().getTime();
        const timeDiffInDays = (currentTime - createdTime) / (1000 * 60 * 60 * 24);
        return timeDiffInDays >= 7;
    };

    return (
        <div>
            <h2>Potential Matches of the Week</h2>
            <button onClick={handlePotentialMatchesRequest}>
                Request Potential Matches of the Week
            </button>
            {createdDate && (
                <p>Created Date: {new Date(createdDate).toLocaleString()}</p>
            )}
            {compatibilityData.length > 0 ? (
                <div>
                    <h3>Potential Match Results:</h3>
                    {compatibilityData.map((compatibility) => (
                        <div key={compatibility.user.id}>
                            <p>
                                User: {compatibility.user.username} - MBTI:{" "}
                                {compatibility.user.mbti}
                            </p>
                            <p>
                                Compatibility Strength:{" "}
                                {getCompatibilityStrengthText(compatibility.strength)}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No compatibility data available.</p>
            )}
        </div>
    );
};

export default PotentialMatches;
