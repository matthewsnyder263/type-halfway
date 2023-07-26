
import React, { useState, useEffect } from "react";
import BootstrapInput from "./BootstrapInput";
import { useNavigate } from "react-router-dom";
import useToken from '@galvanize-inc/jwtdown-for-react';

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
  interest: "",
  picture: "",
}

const SignupForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, token } = useToken();


  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { ...formData }
    // console.log("FORM data", data);
    setUsername(data.username);
    setPassword(data.password);

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
        const responseData = await response.json();
        // console.log(responseData);

        setFormData(initialFormData);
        login(data.username, data.password);
        navigate("/profile");
      } else {
        console.error("Server responded with status", response.status);
        console.error("Server response:", response.error);
      }
    } catch (error) {
      console.error("Error creating user:", error);
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
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div >
              <button type="submit" className="btn btn-primary">
                Sign Up!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
