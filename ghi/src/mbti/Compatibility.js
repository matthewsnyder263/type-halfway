import React, { useEffect, useState } from "react";

const PotentialMatches = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [compatibilityData, setCompatibilityData] = useState([]);
    const [lastCalculationDate, setLastCalculationDate] = useState(null);

    useEffect(() => {
        // Fetch the user API to get the current user's data
        fetch("/api/current-user")
            .then((response) => response.json())
            .then((data) => setCurrentUser(data))
            .catch((error) => console.log(error));

        // Fetch the users API to get all the users' data
        fetch("/api/users")
            .then((response) => response.json())
            .then((data) => setUsers(data.users))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        // Check if a compatibility calculation is allowed based on the last calculation date
        const isCalculationAllowed = canCalculateCompatibility();

        if (isCalculationAllowed && currentUser && users.length > 0) {
            // Calculate compatibility strength for each user
            const compatibilityData = users.map((user) => {
                const compatibilityScore = calculateCompatibilityScore(
                    currentUser.mbti,
                    user.mbti
                );
                return {
                    user,
                    strength: compatibilityScore,
                };
            });

            // Sort the compatibility data by strength in descending order
            compatibilityData.sort((a, b) => b.strength - a.strength);

            // Store the top 5 compatibility data
            const topCompatibilityData = compatibilityData.slice(0, 5);

            // Update the compatibility data in the state
            setCompatibilityData(topCompatibilityData);

            // Update the last calculation date to the current date
            setLastCalculationDate(new Date().toISOString());
        }
    }, [currentUser, users]);

    const canCalculateCompatibility = () => {
        // Check if a week has passed since the last calculation
        if (!lastCalculationDate) {
            return true; // No previous calculation, allow calculation
        }

        const currentDate = new Date();
        const lastCalculationDateObj = new Date(lastCalculationDate);
        lastCalculationDateObj.setDate(lastCalculationDateObj.getDate() + 7);

        return currentDate > lastCalculationDateObj;
    };

    const calculateCompatibilityScore = (mbti1, mbti2) => {
        // Your compatibility calculation logic goes here
        // Implement your own algorithm to determine the compatibility score based on MBTI types
        // For demonstration purposes, let's assume a simple calculation
        return Math.random() * 100; // Random compatibility score between 0 and 100
    };

    return (
        <div>
            <h2>Compatibility Calculator</h2>
            <button
                onClick={() => {
                    if (canCalculateCompatibility()) {
                        // Trigger the compatibility calculation
                        setCompatibilityData([]);
                    } else {
                        // Show a message indicating that a new calculation is not yet allowed
                        alert("You can request a new calculation once a week.");
                    }
                }}
            >
                Request Compatibility Calculation
            </button>
            {compatibilityData.length > 0 ? (
                <div>
                    <h3>Compatibility Results:</h3>
                    {compatibilityData.map((compatibility) => (
                        <div key={compatibility.user.id}>
                            <p>
                                User: {compatibility.user.username} - MBTI:{" "}
                                {compatibility.user.mbti}
                            </p>
                            <p>Compatibility Strength: {compatibility.strength}%</p>
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
