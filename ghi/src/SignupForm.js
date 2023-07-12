import React, { useState, useEffect } from "react";
import BootstrapInput from "./BootstrapInput";
// import axios from "axios";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
    mbti_id: "",
    city: "",
    state: "",
  });

  const [mbtiOptions, setMbtiOptions] = useState([]);


  // const fetchMbtiOptions = async () => {
  //   const response = await fetch("http://localhost:8000/api/mbti-options");
  //   if (response.ok) {
  //     const data = await response.json();
  //     setMbtiOptions(data.mbtis);
  //   }
  // };

  const fetchMbtiOptions = async () => {
      const mbtiUrl = 'http://localhost:8000/api/mbti-options';

      const mbtiResponse = await fetch(mbtiUrl);

      if (mbtiResponse.ok) {
        const mbtiData = await mbtiResponse.json();
        console.log('Type of mbtiData:', typeof mbtiData);
        console.log('Value of mbtiData:', mbtiData);
        setMbtiOptions(mbtiData.mbtis);
      } else {
        console.error('Server responded with status', mbtiResponse.status);
        try {
          const errorData = await mbtiResponse.json();
          console.error('Server response:', errorData);
        } catch (err) {
          console.error('Could not parse server response');
        }
      }
    }

    useEffect(() => {
      fetchMbtiOptions();
    }, []);

  // const fetchMbtiOptions = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/api/mbti-options");
  //     if (response.ok) {
  //       const data = await response.json();
  //       setMbtiOptions(data.mbtis);
  //     } else {
  //       console.error("Response not OK");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching MBTI options:", error);
  //   }
  // };

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
      mbti_id: formData.mbti_id,
      city: formData.city,
      state: formData.state,
    };
    console.log(data)
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
        mbti_id: "",
        city: "",
        state: "",
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
        id="city"
        name="city"
        placeholder="Enter City"
        labelText="City"
        value={formData.city}
        onChange={handleInputChange}
        type="text"
      />
      <BootstrapInput
        id="state"
        name="state"
        placeholder="Enter State"
        labelText="State"
        value={formData.state}
        onChange={handleInputChange}
        type="text"
      />
      <div>
        <label htmlFor="mbti_id">MBTI</label>
          <select
            id="mbti_id"
            name="mbti_id"
            value={formData.mbti_id}
            onChange={handleInputChange}
        >
            {/* {Array.isArray(mbtiOptions) && mbtiOptions.map((option) => {
                return (
                    <option key={option.id} value={option.id}>
                        {option.score}
                    </option>
                );
            })} */}
            {mbtiOptions.map((option) => {
                return (
                    <option key={option.id} value={option.id}>
                        {option.score}
                    </option>
                );
            })}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Sign Up!
      </button>
    </form>
  );
};

export default SignupForm;
