// const { fetchWithCookie, fetchWithCookie } = useToken();
// useEffect(() => {
//     const fetchConfig = {};
//     (async () => {
//         const response = await fetch("http://localhost:8000/token", fetchConfig);
//         const response2 = await fetchWithToken("http://localhost:8000/api/users", "GET", fetchConfig)
//     })
// }, []);

import React, { useEffect, useState, useCallback } from "react";
import useToken from '@galvanize-inc/jwtdown-for-react';

const PotentialMatches = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [compatibilityData, setCompatibilityData] = useState([]);
    const [lastCalculationDate, setLastCalculationDate] = useState(null);

    // const { token } = useToken();
    const { fetchWithToken } = useToken();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await fetchWithToken("http://localhost:8000/api/users", "GET");
                const currentUserResponse = await fetchWithToken("http://localhost:8000/token", "GET");

                if (usersResponse.ok && currentUserResponse.ok) {
                    const usersData = await usersResponse.json();
                    const currentUserData = await currentUserResponse.json();

                    // map mbti
                    if (usersData && usersData.allUsers && currentUserData) {
                        setAllUsers(usersData.allUsers);
                        setCurrentUser(currentUserData);
                    }
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [fetchWithToken]);


    // useEffect(() => {
    //     // Fetch the current user's data
    //     const fetchCurrentUser = async () => {
    //         try {
    //             const response = await fetch("http://localhost:8000/token", {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setCurrentUser(data);
    //             } else {
    //                 console.error('Failed to fetch current user');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching current user:', error);
    //         }
    //     };

    //     // Fetch all users
    //     const fetchAllUsers = async () => {
    //         try {
    //             const response = await fetch("http://localhost:8000/api/users", {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setAllUsers(data.allUsers);
    //             } else {
    //                 console.error('Failed to fetch all users');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching all users:', error);
    //         }
    //     };

    //     if (token) {
    //         fetchCurrentUser();
    //         fetchAllUsers();
    //     }
    // }, [token]);

    // using useCallback so the site does not re-render unless 7 days have passed
    // and it's giving me a error...
    const canCalculateCompatibility = useCallback(() => {
        // Check if 7 days passed since the last calculation
        if (!lastCalculationDate) {
            return true;
        }

        const currentDate = new Date();
        const lastCalculationDateObj = new Date(lastCalculationDate);
        lastCalculationDateObj.setDate(lastCalculationDateObj.getDate() + 7);

        return currentDate > lastCalculationDateObj;
    }, [lastCalculationDate]);


    useEffect(() => {
        //check if potential matches have been posted within the last 7 days
        console.log("Current User:", currentUser);
        const isCalculationAllowed = canCalculateCompatibility();

        if (isCalculationAllowed && currentUser && allUsers.length > 0) {
            // Calculate compatibility strength for each user
            const compatibilityData = allUsers.map((user) => {
                const compatibilityScore = calculateCompatibilityScore(
                    currentUser.mbti,
                    user.mbti
                );
                return {
                    user,
                    strength: compatibilityScore,
                };
            });
            // sort in descending order
            compatibilityData.sort((a, b) => b.strength - a.strength);
            // slice the top 5 matches
            const topCompatibilityData = compatibilityData.slice(0, 5);
            // Update the compatibility data in the state
            setCompatibilityData(topCompatibilityData);
            // Update the last calculation date to the current date
            setLastCalculationDate(new Date().toISOString());
        }
    }, [currentUser, allUsers, canCalculateCompatibility]);


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
        const strengthNumbMap = { "poor": 1, "bad": 2, "average": 3, "good": 4, "perfect": 5 }
        const rawScore = compatibilityChart[mbti1][mbti2]
        return strengthNumbMap[rawScore];
    }

    const getCompatibilityStrengthText = (strength) => {
        const strengthTextMap = {
            1: "Poor",
            2: "Bad",
            3: "Average",
            4: "Good",
            5: "Perfect",
        };
        return strengthTextMap[strength] || "";
    };


    return (
        <div>
            <h2>Potential Matches of the Week</h2>
            <button
                onClick={() => {
                    if (canCalculateCompatibility()) {
                        // trigger the compatibility calculation
                        setCompatibilityData([]);
                    } else {
                        alert("You can view new potential matches once per 7 days");
                    }
                }}
            >
                Request Potential Matches of the week
            </button>
            {compatibilityData.length > 0 ? (
                <div>
                    <h3>Potential Match Results:</h3>
                    {compatibilityData.map((compatibility) => (
                        <div key={compatibility.user.id}>
                            <p>
                                User: {compatibility.user.username} - MBTI:{" "}
                                {compatibility.user.mbti}
                            </p>
                            <p>Compatibility Strength: {getCompatibilityStrengthText(compatibility.strength)}</p>
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
