import React from 'react';
import { useEffect, useState } from "react";
import SignupForm from "./Account/SignUpForm";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import LoginForm from "./Account/LoginForm";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PotentialMatches from './PotentialMatches/PotentialMatches';
import UserProfile from './Account/UserProfilePage';
import Chat from './Account/chat';
import Nav from './Nav.js';
import ProfilePage from "./Account/ProfilePage";
import Match from './Account/Match';
import MatchList from './Account/MatchList';
import Messages from './Messages';

function App() {
  const baseURL = process.env.REACT_APP_API_HOST

  return (
    <div className="">
      <BrowserRouter>
        <Nav />
        <AuthProvider baseUrl={baseURL}>
          <Routes path='/'>
            {/* <ErrorNotification error={error} /> */}
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
            <Route path="/potentialmatch" element={<PotentialMatches />} />
            {/* <Route path="/matches/:matchId/users/:matched_user" element={<Match />} /> */}
            <Route path="/matchlist" element={<MatchList />} />
            {/* <Route path="/chat/:id" element={<Chat />} /> */}
            {/* <Route path="/profilepage/:userId" element={<ProfilePage />} /> */}
            <Route path="/users/:id" element={<ProfilePage />} />
            <Route path="/chat/:id" element={<Messages />} />
            {/* {userId ? <Route path="/interests" element={<InterestsForm user_id={userId} />} /> : null} */}
            {/* <InterestsForm user_id={userId} /> */}
            {/* <Construct info={launchInfo} /> */}
            {/* <Route path = "/logout" element={<LogOut />} /> */}
            {/* {userId ? <Route path="/interests" element={<InterestsForm user_id={userId} />} /> : null} */}
            {/* <InterestsForm user_id={userId} /> */}
            {/* <Construct info={launchInfo} /> */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
