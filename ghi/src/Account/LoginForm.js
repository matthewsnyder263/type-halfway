// import React, { useState } from "react";
// import BootstrapInput from "../BootstrapInput";

// const LoginForm = () => {
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

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

//     const tokenUrl = "http://localhost:8000/token";
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

//     const response = await fetch(tokenUrl, fetchConfig);
//     if (response.ok) {
//       const responseData = await response.json();
//       localStorage.setItem("token", responseData.access_token);
//       setError(null);
//       // Redirect the user or perform any other actions after successful login
//     } else {
//       setError("Invalid credentials");
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


// import React, { useState } from "react";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import BootstrapInput from "../BootstrapInput";
// import getToken from "@galvanize-inc/jwtdown-for-react";


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

//     const { username, password } = formData;

//     if (!username || !password) {
//       setError("Both fields are required");
//       return;
//     }

//     try {
//       // await login(username, password);
//       const token = await getToken();
//       await login(username, password, token);
//       setError(null);
//       // Redirect the user or perform any other actions after successful login
//     } catch (error) {
//       setError("Invalid credentials");
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
import useToken from "@galvanize-inc/jwtdown-for-react";


const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    await login(username, password);
    e.target.reset();
  };

  return (
    <div className="card text-bg-light mb-3">
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
        <button type="submit" className="btn btn-primary">
          Log In!
        </button>
      </form>
    </div>
  );
};

export default LoginForm;





