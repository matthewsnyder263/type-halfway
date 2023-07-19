import React from 'react';
import { useEffect, useState } from "react";
import SignupForm from "./Account/SignupForm";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
// import { getCurrentUserId } from "./auth";
// import { login, logout } from "./auth";
import LoginForm from "./Account/LoginForm";
// import LogOut from "./LogOut";
// import InterestsForm from "./InterestsForm";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PotentialMatches from './PotentialMatches/PotentialMatches';
import ProfilePage from './PotentialMatches/profile';

function App() {
  const baseURL = process.env.REACT_APP_API_HOST;

  // const [launchInfo, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);
  // const [userId, setUserId] = useState(null);


  // useEffect(() => {
  //   // const id = getCurrentUserId();
  //   // setUserId(id);

  //   async function getData() {
  //     // let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
  //     let url = `${baseURL}/api/launch-details`;
  //     console.log("fastapi url: ", url);
  //     let response = await fetch(url);
  //     console.log("------- hello? -------");
  //     let data = await response.json();

  //     if (response.ok) {
  //       console.log("got launch data!");
  //       setLaunchInfo(data.launch_details);
  //     } else {
  //       console.log("drat! something happened");
  //       setError(data.message);
  //     }
  //   }
  //   getData();
  // }, []);

  return (
    <div className="container">
      <BrowserRouter>
        <AuthProvider baseUrl={baseURL}>
          <Routes>
          {/* <ErrorNotification error={error} /> */}
          <Route path = "/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/potentialmatch" element={<PotentialMatches />} />
            <Route path = "/profile" element={<ProfilePage />} />
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
