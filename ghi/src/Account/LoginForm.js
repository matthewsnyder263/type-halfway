// // import { login } from "./auth";
// import React, { useState } from "react";
// import BootstrapInput from "./BootstrapInput";
// import useToken from "@galvanize-inc/jwtdown-for-react";

// const LoginForm = () => {
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });
//   const { login } = useToken();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = {
//       username: formData.username,
//       password: formData.password,
//     };

//     const usersUrl = "http://localhost:8000/token";
//     const fetchConfig = {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     if (!data.username || !data.password) {
//       setError("Both fields are required");
//       return;
//     }
//     console.log(formData);
//     const response = await fetch(usersUrl, fetchConfig);
//     if (response.ok) {
//       const responseData = await response.json();
//       // localStorage.setItem("token", responseData.token);
//       login(responseData.user);
//       setError(null);
//     } else {
//       setError(
//         "You failed at following simple directions. You can't even log-in :("
//       );
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {error && <div className="error">{error}</div>}
//       <BootstrapInput
//         id="username"
//         name="username"
//         placeholder="Enter Username"
//         labelText="Username"
//         value={formData.username}
//         onChange={handleInputChange}
//         type="text"
//       />
//       <BootstrapInput
//         id="password"
//         name="password"
//         placeholder="Enter password"
//         labelText="Password"
//         value={formData.password}
//         onChange={handleInputChange}
//         type="password"
//       />
//       <button type="submit" className="btn btn-primary">
//         Log In!
//       </button>
//     </form>
//   );
// };

// export default LoginForm;






// import React, { useState } from 'react';
// import useToken from '@galvanize-inc/jwtdown-for-react';
// // import BootstrapInput from "./BootstrapInput";
// // import styles from "./styling/Login.module.css";
// // import Logo from "./styling/Logo.png";
// // import { Link } from "react-router-dom";


// const LoginForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useToken();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(username, password);
//     login(username, password);
//     e.target.reset();
//   };

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
//           <div>
//             <input className="btn btn-primary" type="submit" value="Login" />
//           </div>
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
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  form: {
    backgroundColor: 'lightgrey',
    padding: '2em',
    borderRadius: '1em',
    boxShadow: '0 0 1em rgba(0, 0, 0, 0.2)',

  },
  label: {
    fontWeight: 'bold',
    marginRight: '1em'
  }
};



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
    <div className="container d-flex mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card text-bg-light mb-3 shadow p-4">
            <div style={styles.container}>
              <form style={styles.form} onSubmit={handleSubmit}>
                <h5 style={styles.label} className="label form-floating mb-3 card-header" >Login</h5>
                <div className="form-floating mb-3">
                  <label className="form-label">Username:</label>
                  <input
                    name="username"
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                </div>
                <div className="form-floating mb-3">
                  <label className="form-label">Password:</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="btn btn-primary"
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
        </div>
      </div>
    </div>
  )
}

export default LoginForm;
