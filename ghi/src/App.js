import React from 'react';
import { useEffect, useState } from "react";
import SignupForm from "./Account/SignUpForm";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import LoginForm from "./Account/LoginForm";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { Routes, Route } from 'react-router-dom';
import PotentialMatches from './PotentialMatches/PotentialMatches';
import ProfilePage from './ProfilePage';
import Chat from './Account/chat';
import NavbarComponent from './NavBar';
import Nav from './Nav.js';
import { BrowserRouter } from 'react-router-dom';




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
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/potentialmatch" element={<PotentialMatches />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<ProfilePage />} />
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
