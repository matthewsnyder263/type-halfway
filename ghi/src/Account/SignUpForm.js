import React, { useState, useEffect } from "react";
import BootstrapInput from "./BootstrapInput";
import { useNavigate } from "react-router-dom";
import useToken from '@galvanize-inc/jwtdown-for-react';
import zipcodes from 'zipcodes'

const initialFormData = {
  username: "",
  full_name: "",
  email: "",
  gender: "",
  age: "",
  mbti: "",
  password: "",
  bio: "",
  zip_code: "",
  city: "",
  state: "",
  interest: "",
  picture: "",
}

const SignupForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, token } = useToken();
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const zipInfo = zipcodes.lookup(formData.zip_code)
    formData.city = zipInfo.city
    formData.state = zipInfo.state

    const data = { ...formData }
    console.log("data", data)
    try {
      const usersUrl = "http://localhost:8000/api/users";
      const fetchConfig = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        }
      }
      const response = await fetch(usersUrl, fetchConfig);

      if (response.ok) {
        setFormData(initialFormData);
        await login(data.username, data.password);
        navigate("/profile")
      } else {
        console.error("Server responded with status", response.status);
        console.error("Server response:", response.error);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <BootstrapInput
                id="username"
                name="username"
                placeholder="Enter username"
                labelText="Username"
                value={formData.username}
                onChange={handleInputChange}
                type="text"
              />
            </div>
            <div className="form-floating mb-3">
              <BootstrapInput
                id="email"
                name="email"
                placeholder="you@example.com"
                labelText="Email"
                value={formData.email}
                onChange={handleInputChange}
                type="email"
              />
            </div>
            <div className="form-floating mb-3">
              <BootstrapInput
                id="password"
                name="password"
                placeholder="Enter password"
                labelText="Password"
                value={formData.password}
                onChange={handleInputChange}
                type="password"
              />
            </div>
            <div className="form-floating mb-3">
              <BootstrapInput
                id="full_name"
                name="full_name"
                placeholder="Enter Full Name"
                labelText="Full Name"
                value={formData.full_name}
                onChange={handleInputChange}
                type="text"
              />
            </div>
            <div className="form-floating mb-3">
              <BootstrapInput
                id="age"
                name="age"
                placeholder="Age"
                labelText="Age"
                value={formData.age}
                onChange={handleInputChange}
                type="number"
                max="100"
              />
            </div>
            <div className="form-floating mb-3">
              <select
                id="mbti"
                name="mbti"
                className="form-control"
                placeholder="Select your MBTI type"
                value={formData.mbti}
                onChange={handleInputChange}
                type="text"
              >
                <option value="" disabled>
                  Select your MBTI type
                </option>
                <option value="INTJ">INTJ</option>
                <option value="INTP">INTP</option>
                <option value="ENTJ">ENTJ</option>
                <option value="ENTP">ENTP</option>
                <option value="INFJ">INFJ</option>
                <option value="INFP">INFP</option>
                <option value="ENFJ">ENFJ</option>
                <option value="ENFP">ENFP</option>
                <option value="ISTJ">ISTJ</option>
                <option value="ISTP">ISTP</option>
                <option value="ESTJ">ESTJ</option>
                <option value="ESTP">ESTP</option>
                <option value="ISFJ">ISFJ</option>
                <option value="ISFP">ISFP</option>
                <option value="ESFJ">ESFJ</option>
                <option value="ESFP">ESFP</option>
              </select>
            </div>
            <div className="form-floating mb-3">
              <BootstrapInput
                id="bio"
                name="bio"
                placeholder="Enter Bio"
                labelText="Bio"
                value={formData.bio}
                onChange={handleInputChange}
                type="text"
              />
            </div>
            <div className="form-floating mb-3">
              <BootstrapInput
                id="zip_code"
                name="zip_code"
                placeholder="Enter Zip-code"
                labelText="Zip-code"
                value={formData.zip_code}
                onChange={handleInputChange}
                type="number"
              />
            </div>
            <div className="form-floating mb-3">
              <BootstrapInput
                id="interest"
                name="interest"
                placeholder="Enter Interest"
                labelText="Interest"
                value={formData.interest}
                onChange={handleInputChange}
                type="text"
              />
            </div>
            <BootstrapInput
              id="picture"
              name="picture"
              placeholder="Enter Picture URL"
              labelText="Picture URL"
              value={formData.picture}
              onChange={handleInputChange}
              type="text"
            />
            <div className="mb-3">
              <select
                id="gender"
                name="gender"
                className="form-control"
                placeholder="Select your gender"
                value={formData.gender}
                onChange={handleInputChange}
                type="text"
              >
                <option value="" placeholder="wa" disabled>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-row items-center justify-between">
              <button
                className="d-flex btn btn-sm btn-outline-light mt-3 justify-content-center align-items-center" type="submit"
                disabled={loading}
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
                <span style={{ margin: "5px 8px", fontSize: "large" }}>
                  {loading ? "Signing up..." : "Sign Up!"}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="24" fill="currentColor" className="bi bi-heart-arrow" viewBox="0 0 16 16">
                  <path d="M6.707 9h4.364c-.536 1.573 2.028 3.806 4.929-.5-2.9-4.306-5.465-2.073-4.929-.5H6.707L4.854 6.146a.5.5 0 1 0-.708.708L5.293 8h-.586L2.854 6.146a.5.5 0 1 0-.708.708L3.293 8h-.586L.854 6.146a.5.5 0 1 0-.708.708L1.793 8.5.146 10.146a.5.5 0 0 0 .708.708L2.707 9h.586l-1.147 1.146a.5.5 0 0 0 .708.708L4.707 9h.586l-1.147 1.146a.5.5 0 0 0 .708.708L6.707 9Z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
