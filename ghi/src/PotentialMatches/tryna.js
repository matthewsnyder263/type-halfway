import React, { useState, useEffect } from 'react';
import styles from "./styling/Signup.module.css"; // RENAME or MAKE A CSS FOR EDIT IF DIFFERENT
import { Link } from "react-router-dom";
import Logo from "./styling/Logo.png";

const EditProfileForm = ({ userData = {
    username: "",
    email: "",
    password: "",
    full_name: "",
    mbti_id: "",
    // city: "",
    // state: "",
    gender: "",
    bio: "",
    interests: [],
    picture: "",
    zipcode: "",
    age: "",
} }) => {
    const [formData, setFormData] = useState({
        ...userData,
        interests: userData.interests.join(',')
    });
    const [mbtiOptions, setMbtiOptions] = useState([]);
    const fetchMbtiOptions = async () => {
        const mbtiUrl = 'http://localhost:8000/api/mbti-options';
        const mbtiResponse = await fetch(mbtiUrl);
        if (mbtiResponse.ok) {
            const mbtiData = await mbtiResponse.json();
            console.log('Type of mbtiData:', typeof mbtiData);
            console.log('Value of mbtiData:', mbtiData);
            setMbtiOptions(mbtiData.mbtis);
        } else {
            console.error('Server responded with status', mbtiResponse.status);
            try {
                const errorData = await mbtiResponse.json();
                console.error('Server response:', errorData);
            } catch (err) {
                console.error('Could not parse server response');
            }
        }
    }
    useEffect(() => {
        fetchMbtiOptions();
    }, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            interests: formData.interests.split(',')
        };
        console.log(data)
        const usersUrl = `http://localhost:8000/api/users/${data.id}/`;
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(usersUrl, fetchConfig);
        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles["signup"]}>
                <div className={styles["signup2"]}>
                    <div className={styles["signup-page"]}>
                        <div className={styles["rectangle-2"]}></div>
                        <div className={styles["rectangle-1"]}></div>
                        <div className={styles["already-have-an-account-login"]}>
                            <span>
                                <span className={styles["already-have-an-account-login-span"]}>
                                    Already have an account?{" "}
                                </span>
                                <Link
                                    className={styles["already-have-an-account-login-span2"]}
                                    to="/login"
                                >
                                    Login
                                </Link>
                            </span>
                        </div>
                        <div className={styles["create-an-account"]}>Edit Profile</div>
                        <div className={styles["input-name"]}>
                            <input
                                id="full_name"
                                name="full_name"
                                className={styles["full-name"]}
                                type="text"
                                placeholder="Full Name"
                                onChange={handleInputChange}
                                value={formData.full_name}
                            />
                        </div>
                        <div className={styles["input-name"]}>
                            <input
                                id="username"
                                name="username"
                                className={styles["username"]}
                                type="text"
                                placeholder="Username"
                                onChange={handleInputChange}
                                value={formData.username}
                            />
                        </div>
                        <div className={styles["input-name"]}>
                            <input
                                id="email"
                                name="email"
                                className={styles["email"]}
                                type="text"
                                placeholder="Email"
                                onChange={handleInputChange}
                                value={formData.email}
                            />
                        </div>
                        <div className={styles["input-name"]}>
                            <input
                                id="gender"
                                name="gender"
                                className={styles["gender"]}
                                type="text"
                                placeholder="Gender"
                                onChange={handleInputChange}
                                value={formData.gender}
                            />
                        </div>
                        <div className={styles["input-name"]}>
                            <input
                                id="bio"
                                name="bio"
                                className={styles["bio"]}
                                type="text"
                                placeholder="Bio"
                                onChange={handleInputChange}
                                value={formData.bio}
                            />
                        </div>
                        <div className={styles["input-name"]}>
                            <input
                                id="interests"
                                name="interests"
                                className={styles["interests"]}
                                type="text"
                                placeholder="Interests"
                                onChange={e => {
                                    setFormData({ ...formData, interests: e.target.value.split(',') });
                                }}
                                value={formData.interests}
                            />
                        </div>
                        <div className={styles["input-name"]}>
                            <input
                                id="picture"
                                name="picture"
                                className={styles["picture"]}
                                type="text"
                                placeholder="Picture"
                                onChange={handleInputChange}
                                value={formData.picture}
                            />
                        </div>
                        <div className={styles["input-name"]}>
                            <input
                                id="zipcode"
                                name="zipcode"
                                className={styles["zipcode"]}
                                type="text"
                                placeholder="Zipcode"
                                onChange={handleInputChange}
                                value={formData.zipcode}
                            />
                        </div>
                        <div className={styles["input-name"]}>
                            <input
                                id="age"
                                name="age"
                                className={styles["age"]}
                                type="number"
                                placeholder="Age"
                                onChange={handleInputChange}
                                value={formData.age}
                            />
                        </div>
                        <select
                            id="mbti_id"
                            className={styles["mbti"]}
                            name="mbti_id"
                            value={formData.mbti_id}
                            onChange={handleInputChange}
                        >
                            {mbtiOptions.map((option) => {
                                return (
                                    <option key={option.id} value={option.id}>
                                        {option.score}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <button type="submit" className={styles["rectangle-7"]}>
                Save Changes
            </button>
            <div className={styles["find-match-and-meet-halfway"]}>
                <span>
                    <span className={styles["find-match-and-meet-halfway-span"]}>
                        FIND, MATCH, AND MEET{" "}
                    </span>
                    <span className={styles["find-match-and-meet-halfway-span2"]}>
                        HALFWAY
                    </span>
                </span>
            </div>
            <img className={styles["logo-1"]} src={Logo} alt="Logo" />
        </form>
    );
};
export default EditProfileForm;
