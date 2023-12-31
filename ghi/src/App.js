import React from 'react';
import SignupForm from "./Account/SignUpForm";
import LoginForm from "./Account/LoginForm";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PotentialMatches from './PotentialMatches/PotentialMatches';
import UserProfile from './Account/UserProfilePage';
import Chat from './Account/chat';
import Nav from './NavBar//Nav.js';
import ProfilePage from './Account/ProfilePage';
import MatchList from './PotentialMatches/MatchList';
import CompatibilityCalculator from './HomePage/CalculateCompat';
import HomePage from './HomePage/HomePage';



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
            <Route path="/profile/:userId" element={<UserProfile />} />
            <Route path="/potentialmatch" element={<PotentialMatches />} />
            <Route path="/matchlist" element={<MatchList />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/compatibilitycalculator" element={<CompatibilityCalculator />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
