
import React, { useState, useEffect } from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';
import useAuthContext from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import BootstrapInput from "./BootstrapInput";
import styles from "./styling/Login.module.css";
import Logo from "./styling/Logo.png";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [invalid, setInvalid] = useState(false);
  const { login } = useToken();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [invalid, setInvalid] = useState(false);
  // const navigate = useNavigate();

  // const { login } = useAuthContext();


  const handleInvalid = () => {
    setInvalid(true);
  };

  const fetchUser = async () => {
    const url = 'http://localhost:8000/token';
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      if (data === null) {
        handleInvalid();
      } else {
        navigate("/potentialmatch");
      }
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await login(username, password);
  //   fetchUser();
  // };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await login(formData.username, formData.password);
  //     console.log(formData)
  //   } catch (error) {
  //     console.error('Login failed', error);
  //   }
  // };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await login(formData.username, formData.password);
          fetchUser();
          navigate("/potentialmatch");
      } catch (error) {
          console.error('Login failed', error);
          setInvalid(true);
      }
  };


  // const [formData, setFormData] = useState({
  //   username: "",
  //   password: "",
  // });
  // const { login } = useToken();

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await login(formData.username, formData.password);
  //     console.log(formData)
  //   } catch (error) {
  //     console.error('Login failed', error);
  //   }
  // };


  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.login}>
        <div className={styles.login2}>
          <div className={styles["login-page"]}>
            <div className={styles["rectangle-2"]}></div>

            <svg
              className={styles["rectangle-1"]}
              width="1339"
              height="1164"
              viewBox="0 0 1339 1164"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.0169678 50C0.0169678 22.3858 22.4027 0 50.017 0H1289C1316.61 0 1339 22.3858 1339 50V1113.61C1339 1141.22 1316.61 1163.61 1289 1163.61H50.0169C22.4027 1163.61 0.0169678 1141.22 0.0169678 1113.61V50Z"
                fill="#FCFCFC"
              />
            </svg>

            <div className={styles["sign-in"]}>Sign-in</div>

            <div className={styles["login-content"]}>
              <div className={styles["don-t-have-an-account-signup-here"]}>
                <span>
                  <span
                    className={styles["don-t-have-an-account-signup-here-span"]}
                  >
                    Don’t have an account?{" "}
                  </span>
                  <Link
                    to="/signup"
                    className={
                      styles["don-t-have-an-account-signup-here-span2"]
                    }
                  >
                    Signup Here
                  </Link>
                </span>
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

              <div className={styles["input-name2"]}>
                <input
                  className={styles["password"]}
                  type="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  value={formData.password}
                  name="password"
                />
              </div>

              <button type="submit" className={styles["rectangle-7"]}>
                Login
              </button>
            </div>

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
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
