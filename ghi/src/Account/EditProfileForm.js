import React, { useState, useEffect } from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';
import { useNavigate } from 'react-router-dom';
import BootstrapInput from "./BootstrapInput";

const EditProfileForm = () => {
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();
  const { token } = useToken();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    full_name: '',
    mbti: '',
    city: '',
    state: '',
    gender: '',
    bio: '',
    interests: [],
    picture: '',
    zip_code: '',
    age: '',
  });

  useEffect(() => {
    if (!token) {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        navigate("/login");
      }
    }
  }, [navigate, token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);


  const fetchCurrentUser = async () => {
    const url = 'http://localhost:8000/token';
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      setCurrentUser(data.account);
      setFormData({
        username: data.account.username,
        email: data.account.email,
        full_name: data.account.full_name,
        gender: data.account.gender,
        age: data.account.age,
        mbti: data.account.mbti,
        city: data.account.city,
        state: data.account.state,
        gender: data.account.gender,
        bio: data.account.bio,
        interests: data.account.interest,
        picture: data.account.picture,
        zip_code: data.account.zip_code,
        age: data.account.age
      });
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:8000/api/users/${currentUser.id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedUserData = await response.json();
        console.log('User data updated:', updatedUserData);
        navigate('/profile');
      } else {
        console.log('Update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="container">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <div>
            <h1>Edit Profile</h1>
            {currentUser ? (
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <label htmlFor="username">fff</label>
                  <BootstrapInput
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email">email</label>
                  <BootstrapInput
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password">password</label>
                  <BootstrapInput
                    type="text"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="full_name">full_name</label>
                  <BootstrapInput
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="age">age</label>
                  <BootstrapInput
                    type="text"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="mbti">mbti</label>
                  <BootstrapInput
                    type="text"
                    id="mbti"
                    name="mbti"
                    value={formData.mbti}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="gender">gender</label>
                  <BootstrapInput
                    type="text"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="bio">bio</label>
                  <BootstrapInput
                    type="text"
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="interest">interest</label>
                  <BootstrapInput
                    type="text"
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="picture">picture</label>
                  <BootstrapInput
                    type="text"
                    id="picture"
                    name="picture"
                    value={formData.picture}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="zip_code">Zip Code</label>
                  <BootstrapInput
                    type="text"
                    id="zip_code"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit">Update Profile</button>
              </form>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div >
    </div>

  );
};

export default EditProfileForm;
