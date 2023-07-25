import React from 'react';
import { useEffect, useState } from "react";
import LoginForm from "./pages/Account/LoginForm"
import SignupForm from "./pages/Account/SignUpForm";
import "./pages/PotentialMatches/styles/PotentialMatch.css";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PotentialMatches from './pages/PotentialMatches/PotentialMatches';
import ProfilePage from './pages/Account/ProfilePage';
import Nav from './Nav.js';
import useToken from '@galvanize-inc/jwtdown-for-react';
import UserProfile from './pages/Account/UserProfile.js';

function App() {
  const baseURL = process.env.REACT_APP_API_HOST

  return (
    <div className="">
      <BrowserRouter>
        <AuthProvider baseUrl={baseURL}>
          <Nav />
          <Routes path='/'>
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/potentialmatch" element={<PotentialMatches />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
