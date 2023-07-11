import React, { useState } from "react";
import BootstrapInput from "./BootstrapInput";
// import axios from "axios";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
    mbti: "",
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
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <BootstrapInput
        id="username"
        name="username"
        placeholder="Enter username"
        labelText="Username"
        value={formData.username}
        onChange={handleInputChange}
        type="text"
      />
      <BootstrapInput
        id="email"
        name="email"
        placeholder="you@example.com"
        labelText="Email"
        value={formData.email}
        onChange={handleInputChange}
        type="email"
      />
      <BootstrapInput
        id="password"
        name="password"
        placeholder="Enter password"
        labelText="Password"
        value={formData.password}
        onChange={handleInputChange}
        type="password"
      />
      <BootstrapInput
        id="full_name"
        name="full_name"
        placeholder="Enter Full Name"
        labelText="Full Name"
        value={formData.full_name}
        onChange={handleInputChange}
        type="text"
      />
      <BootstrapInput
        id="mbti"
        name="mbti"
        placeholder="Enter MBTI"
        labelText="MBTI"
        value={formData.mbti}
        onChange={handleInputChange}
        type="text"
      />
      <button type="submit" className="btn btn-primary">
        Sign Up!
      </button>
    </form>
  );
};

export default SignupForm;
