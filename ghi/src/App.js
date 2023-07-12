// import { useEffect, useState } from "react";
import SignupForm from "./Account/SignUpForm";
import "./App.css";
import LoginForm from "./Account/LoginForm";
// import LogOut from "./Account/LogOut";
// import InterestsForm from "./InterestsForm";
import PotentialMatches from "./PotentialMatches/PotentialMatches.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

function App() {
  // const baseURL = `${process.env.REACT_APP_API_HOST}/api/users`;
  const baseUrl = process.env.REACT_APP_API_HOST || "";

  // const [launchInfo, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getData() {
  //     let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
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
    <AuthProvider baseUrl={baseUrl}>
      <div>
          { <LoginForm />}
          {/* <LogOut /> */}
          {/* <InterestsForm /> */}
          {/* <Routes>
            <Route path="potentialmatches" element={<PotentialMatches />} />
            <Route path="signup" element={<SignupForm />} />
            <Route path="login" element={<LoginForm />} />
          </Routes> */}
        </div>
      {/* </BrowserRouter> */}
    </AuthProvider>
  );
}

export default App;
