import React, { useState, useEffect } from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';
import { useNavigate } from "react-router-dom";
import { colors } from '@mui/material';


const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [invalid, setInvalid] = useState(false)
  const navigate = useNavigate()
  const { login, token } = useToken()


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
    if (response.ok) {
      const data = await response.json()
      if (data === null) {
        handleInvalid()
      } else {
        localStorage.setItem('user', JSON.stringify(data.account));
        navigate("/matchlist")
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
          <h2 style={styles.label} className='label form-floating mb-3 card-header' >Login</h2>
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
          <div className="flex flex-row items-center justify-between">
            <button
              className="d-flex btn btn-sm btn-outline-light mt-3 justify-content-center align-items-center" type="submit"
              style={{
                backgroundColor: '#dab7de9f',
                color: 'white',
                border: '2px solid white',
                borderRadius: '5em',
                boxShadow: '0 0 100em rgba(200, 75, 150, 102)',
                fontWeight: 'bold',
                fontFamily: 'ui-rounded',
                alignContent: 'center',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-door-open-fill"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"></path>
              </svg>
              <span style={{ margin: "5px 8px", fontSize: "large" }}>Login</span>
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
    backgroundColor: 'linear-gradient(rgba(100, 0, 150, 8), rgba(200, 75, 150, 102))',
    padding: '5em',
    borderRadius: '5em',
    boxShadow: '0 0 100em rgba(200, 75, 150, 102)',

  },
  label: {
    fontWeight: 'bold',
    marginRight: '8em',
    marginBottom: '8em',
    color: 'white',
  },
};
