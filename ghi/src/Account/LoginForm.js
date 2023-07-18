
// import BootstrapInput from "./BootstrapInput";
// import styles from "./styling/Login.module.css";
// import Logo from "./styling/Logo.png";
// import { Link } from "react-router-dom";


// const LoginForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [checker, setChecker] = useState(false);
//   const [invalid, setInvalid] = useState(false);
//   const navigate = useNavigate();

//   const { login } = useAuthContext();

//   const handleInvalid = () => {
//     setInvalid(true);
//   };

//   const handleChecker = () => {
//     setChecker(!checker);
//   };

//   const fetchUser = async () => {
//     const url = 'http://localhost:8000/token';
//     const response = await fetch(url, {
//       method: "GET",
//       credentials: "include",
//     });
//     if (response.ok) {
//       const data = await response.json();
//       if (data === null) {
//         handleInvalid();
//       } else {
//         navigate("/potentialmatch");
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await login(username, password);
//     fetchUser();
//   };

//   useEffect(() => {
//     login(username, password);
//   }, [checker, login, username, password]);


//   return (
//     <div className="card text-bg-light mb-3">
//       <h5 className="card-header">Login</h5>
//       <div className="card-body">
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Username:</label>
//             <input
//               name="username"
//               type="text"
//               className="form-control"
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Password:</label>
//             <input
//               name="password"
//               type="password"
//               className="form-control"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div className="flex items-center justify-between">
//               <button
//                 onMouseOver={handleChecker}
//                 className="bg-[#05bd83] hover:bg-[#009767] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 type="submit"
//               >
//                 Login
//               </button>
//             </div>
//           <div className="w-full text-center pt-4">
//               {invalid ? (
//                 <div className="w-full bg-[#ffa3a9] rounded-md border border-gray-500 p-4 inline-block">
//                   <div className="text-[#a3000b]">
//                     Invalid email or password
//                   </div>
//                 </div>
//               ) : null}
//             </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default LoginForm;

import React, { useState, useEffect } from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';
import useAuthContext from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuthContext();

  const handleInvalid = () => {
    setInvalid(true);
  };

  const fetchUser = async () => {
    const url = 'http://localhost:8000/token';
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      if (data === null) {
        handleInvalid();
      } else {
        navigate("/potentialmatch");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
    fetchUser();
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Login</h5>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              name="username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              name="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#05bd83] hover:bg-[#009767] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="w-full text-center pt-4">
            {invalid ? (
              <div className="w-full bg-[#ffa3a9] rounded-md border border-gray-500 p-4 inline-block">
                <div className="text-[#a3000b]">
                  Invalid email or password
                </div>
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm;
