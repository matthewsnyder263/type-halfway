import BootstrapInput from "./BootstrapInput";
import React, { useState, useEffect } from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';
import useAuthContext from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [invalid, setInvalid] = useState(false)
  const navigate = useNavigate()
  const { login, token } = useToken()
  // console.log("token", token)


  const handleInvalid = () => {
    setInvalid(true);
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  // const fetchUser = async () => {
  //   const url = 'http://localhost:8000/token'
  //   const response = await fetch(url, {
  //     method: "GET",
  //     credentials: "include",
  //   });
  //   // console.log("response", response)
  //   if (response.ok) {
  //     const data = await response.json()
  //     // console.log("account", data.account)
  //     if (data === null) {
  //       handleInvalid()
  //     } else {
  //       localStorage.setItem('user', JSON.stringify(data.account));
  //       // console.log("data.account", data.account)
  //       navigate("/profile")
  //     }
  //   }
  // };
  const fetchUser = async () => {
    const url = 'http://localhost:8000/token'
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json()
      if (!data.account) {
        throw new Error("Invalid username or password.");
      } else {
        localStorage.setItem('user', JSON.stringify(data.account));
        navigate("/profile")
      }
    } else {
      throw new Error("Failed to fetch user.");
    }
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await login(username, password)
  //     fetchUser()
  //   } catch (error) {
  //     console.error("Login failed with exception:", error)
  //     handleInvalid()
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      // Add a slight delay before calling fetchUser()
      setTimeout(() => {
        fetchUser();
      }, 1000);
    } catch (error) {
      console.error("Login failed with exception:", error);
      handleInvalid();
    }
  };



  return (
    <div className="flex flex-row justify-content-center">
      <div style={styles.container}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <h2 style={styles.label} className='label form-floating mb-3 card-header'>
            Start Matching
          </h2>
          <div className="form-floating mb-8">
            <input
              name="username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <label className="form-label">Username:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              name="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <label className="form-label">Password:</label>
          </div>
          <div className="flex flex-row items-center justify-between">
            <button
              className="d-flex btn btn-sm btn-outline-light mt-3 justify-content-center align-items-center" type="submit"
              style={{
                backgroundColor: 'rgba(200, 75, 150, 102)',
                color: 'white',
                border: '2px solid white',
                borderRadius: '5em',
                boxShadow: '0 0 100em rgba(00, 75, 150, 102)',
                fontWeight: 'bold',
                fontFamily: 'ui-rounded',
                alignContent: 'center',

              }}
            >
              <span style={{ margin: "5px 8px", fontSize: "large" }}>
                Login
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="24" fill="currentColor" className="bi bi-heart-arrow" viewBox="0 0 16 16">
                <path d="M6.707 9h4.364c-.536 1.573 2.028 3.806 4.929-.5-2.9-4.306-5.465-2.073-4.929-.5H6.707L4.854 6.146a.5.5 0 1 0-.708.708L5.293 8h-.586L2.854 6.146a.5.5 0 1 0-.708.708L3.293 8h-.586L.854 6.146a.5.5 0 1 0-.708.708L1.793 8.5.146 10.146a.5.5 0 0 0 .708.708L2.707 9h.586l-1.147 1.146a.5.5 0 0 0 .708.708L4.707 9h.586l-1.147 1.146a.5.5 0 0 0 .708.708L6.707 9Z" />
              </svg>
            </button>
          </div>
          <div className="w-full text-center pt-4">
            {invalid ? (
              <div className="w-full bg-[#ffa3a9] rounded-md border border-gray-500 p-4 inline-block">
                <div className="text-[#a3000b]">
                  Invalid username or password
                </div>
              </div>
            ) : null}
          </div>
        </form>
      </div >
    </div >
  )
}

export default LoginForm






const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  form: {
    backgroundColor: 'linear-gradient(rgba(120, 90, 155, 150), rgba(150, 125, 160, 102))',
    padding: '6em',
    borderRadius: '5em',
    boxShadow: '0 0 100em rgba(200, 75, 150, 102)',
    width: '500px',

  },
  label: {
    fontWeight: 'bold',
    marginRight: '4em',
    marginBottom: '4em',
    color: 'white',
    fontFamily: 'ui-rounded',
  },
};
