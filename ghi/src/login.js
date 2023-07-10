import styles from "./styles/Login.module.css";
import Logo from "./styles/Logo.png";
import React from "react";

const Login = ({ ...props }) => {
  return (
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
                <span
                  className={styles["don-t-have-an-account-signup-here-span2"]}
                >
                  Signup Here
                </span>
              </span>
            </div>

            <div className={styles["input-name"]}>
              <input
                className={styles["email"]}
                type="text"
                placeholder="Email"
              />
            </div>

            <div className={styles["input-name2"]}>
              <input
                className={styles["password"]}
                type="password"
                placeholder="Password"
              />
            </div>

            <button className={styles["rectangle-7"]}>Login</button>
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

          <img className={styles["logo-1"]} src={require(Logo)} alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default Login;
