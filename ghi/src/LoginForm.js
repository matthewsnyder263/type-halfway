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






import React, { useState } from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';
// import BootstrapInput from "./BootstrapInput";
// import styles from "./styling/Login.module.css";
// import Logo from "./styling/Logo.png";
// import { Link } from "react-router-dom";


const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    login(username, password);
    e.target.reset();
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
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input className="btn btn-primary" type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm;
