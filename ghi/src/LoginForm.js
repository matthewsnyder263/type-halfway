import React, { useState } from "react";
import BootstrapInput from "./BootstrapInput";

const LoginForm = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: formData.username,
      password: formData.password,
    };

    const usersUrl = "http://localhost:8000/api/login";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (!data.username || !data.password) {
      setError("Both fields are required");
      return;
    }
    console.log(formData);
    const response = await fetch(usersUrl, fetchConfig);
    if (response.ok) {
      const responseData = await response.json();
      localStorage.setItem("token", responseData.token);
      setError(null);
    } else {
      setError(
        "You failed at following simple directions. You can't even log-in :("
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <BootstrapInput
        id="username"
        name="username"
        placeholder="Enter Username"
        labelText="Username"
        value={formData.username}
        onChange={handleInputChange}
        type="text"
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
      <button type="submit" className="btn btn-primary">
        Log In!
      </button>
    </form>
  );
};

export default LoginForm;
