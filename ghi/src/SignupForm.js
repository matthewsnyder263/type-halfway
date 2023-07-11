import React, { useState } from "react";
import styles from "./styling/Signup.module.css";
import { Link } from "react-router-dom";
import Logo from "./styling/Logo.png";
// import axios from "axios";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
    mbti: "",
    city: "",
    state: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: formData.username,
      email: formData.email,
      // # we're trying hashed password
      password: formData.password,
      full_name: formData.full_name,
      mbti: formData.mbti,
      city: formData.city,
      state: formData.state,
    };
    const usersUrl = "http://localhost:8000/api/users/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(usersUrl, fetchConfig);
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);

      setFormData({
        username: "",
        email: "",
        password: "",
        full_name: "",
        mbti: "",
        city: "",
        state: "",
      });
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

            <div className={styles["create-an-account"]}>Create an Account</div>

            <div className={styles["input-name"]}>
              <input
                className={styles["full-name"]}
                type="text"
                placeholder="Full Name"
                onChange={handleInputChange}
                value={formData.full_name}
                name="full_name"
              />
            </div>
            <div className={styles["input-name"]}>
              <input
                className={styles["username"]}
                type="text"
                placeholder="Username"
                onChange={handleInputChange}
                value={formData.username}
                name="username"
              />
            </div>
          </div>
          <div className={styles["input-name"]}>
            <input
              className={styles["password"]}
              type="password"
              placeholder="Password"
              onChange={handleInputChange}
              value={formData.password}
              name="password"
            />
          </div>
          <div className={styles["rectangle-8"]}>
            <input
              className={styles["city"]}
              type="text"
              placeholder="City"
              onChange={handleInputChange}
              value={formData.city}
              name="city"
            />
            <div className={styles["line-14"]}></div>
          </div>
        </div>
        <div className={styles["rectangle-9"]}>
          <input
            className={styles["state"]}
            type="text"
            placeholder="State"
            onChange={handleInputChange}
            value={formData.state}
            name="state"
          />
        </div>
        <select
          className={styles["mbti"]}
          name="mbti"
          value={formData.mbti}
          onChange={handleInputChange}
        >
          <option value="">Select MBTI</option>
          <option value="INTJ">INTJ</option>
          <option value="INTP">INTP</option>
          <option value="ENTJ">ENTJ</option>
          <option value="ENTP">ENTP</option>
          {/* Add more MBTI options as needed */}
        </select>
      </div>

      <button type="submit" className={styles["rectangle-7"]}>
        Create Account
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

export default SignupForm;
