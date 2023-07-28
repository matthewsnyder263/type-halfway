import React from 'react';
import SignupForm from "./Account/SignUpForm";
// import Construct from "./Construct.js";
// import ErrorNotification from "./ErrorNotification";
// import "./App.css";
import LoginForm from "./Account/LoginForm";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PotentialMatches from './PotentialMatches/PotentialMatches';
import UserProfile from './Account/UserProfile';
import Chat from './Account/chat';
import Nav from './NavBar//Nav.js';
import ProfilePage from "./Account/ProfilePage";
import Match from './PotentialMatches/Match';
import MatchList from './PotentialMatches/MatchList';
import CompatibilityCalculator from './HomePage/CalculateCompat';
import HomePage from './HomePage/HomePage';
import EditProfileForm from './Account/EditProfileForm';


function App() {
  const baseURL = process.env.REACT_APP_API_HOST



  return (
    <div className="">
      <BrowserRouter>
        <AuthProvider baseUrl={baseURL}>
          <Nav />
          <Routes path='/'>
            {/* <ErrorNotification error={error} /> */}
            {/* <Route path='/home' element={<Home />} /> */}
            <Route path="/editprofile" element={<EditProfileForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
            <Route path="/potentialmatch" element={<PotentialMatches />} />
            {/* <Route path="/matches/:matchId/users/:matched_user" element={<Match />} /> */}
            <Route path="/matchlist" element={<MatchList />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/compatibilitycalculator" element={<CompatibilityCalculator />} />
            <Route path="/home" element={<HomePage />} />
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
