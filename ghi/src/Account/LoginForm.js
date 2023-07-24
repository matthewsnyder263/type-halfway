import BootstrapInput from "../BootstrapInput";
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

  const fetchUser = async () => {
    const url = 'http://localhost:8000/token'
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    // console.log("response", response)
    if (response.ok) {
      const data = await response.json()
      // console.log("account", data.account)
      if (data === null) {
        handleInvalid()
      } else {
        localStorage.setItem('user', JSON.stringify(data.account));
        // console.log("data.account", data.account)
        navigate("/profile")
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password)
      fetchUser()
    } catch (error) {
      console.error("Login failed with exception:", error)
      handleInvalid()
    }
  }



  return (
    <div className="row justify-content-center">
      <div style={styles.container}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <h5 style={styles.label} className='label form-floating mb-3 card-header' >Login</h5>
          <div className="form-floating mb-3">
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
          <div className="flex items-center justify-between">
            <button
              className="btn btn-primary"
              type="submit"
            >
              Login
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
      </div>
    </div>
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
    backgroundColor: 'rgba(200, 65, 115, 8)',
    padding: '5em',
    borderRadius: '5em',
    boxShadow: '0 0 100em rgba(200, 75, 150, 102)',

  },
  label: {
    fontWeight: 'bold',
    marginRight: '12em'
  }
};
