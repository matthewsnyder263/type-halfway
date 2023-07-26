import React from 'react';

export function logout() {
    // Remove user data from local storage when user logs out
    localStorage.removeItem("user");
}

export function getCurrentUserId() {
    const user = localStorage.getItem("user");
    if (user && typeof user === "string" && user !== "undefined") {
        const parsedUser = JSON.parse(user);
        if (parsedUser && parsedUser.id) {
            return parsedUser.id;
        }
    }
    console.error("No user or user ID found in local storage");
    return null;
}
