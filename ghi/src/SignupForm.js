// import React, { useState, useEffect } from "react";
// import BootstrapInput from "./BootstrapInput";
// // import axios from "axios";

// const SignupForm = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     full_name: "",
//     mbti_id: "",
//     city: "",
//     state: "",
//   });

//   const [mbtiOptions, setMbtiOptions] = useState([]);


//   // const fetchMbtiOptions = async () => {
//   //   const response = await fetch("http://localhost:8000/api/mbti-options");
//   //   if (response.ok) {
//   //     const data = await response.json();
//   //     setMbtiOptions(data.mbtis);
//   //   }
//   // };

//   const fetchMbtiOptions = async () => {
//       const mbtiUrl = 'http://localhost:8000/api/mbti-options';

//       const mbtiResponse = await fetch(mbtiUrl);

//       if (mbtiResponse.ok) {
//         const mbtiData = await mbtiResponse.json();
//         console.log('Type of mbtiData:', typeof mbtiData);
//         console.log('Value of mbtiData:', mbtiData);
//         setMbtiOptions(mbtiData.mbtis);
//       } else {
//         console.error('Server responded with status', mbtiResponse.status);
//         try {
//           const errorData = await mbtiResponse.json();
//           console.error('Server response:', errorData);
//         } catch (err) {
//           console.error('Could not parse server response');
//         }
//       }
//     }

//     useEffect(() => {
//       fetchMbtiOptions();
//     }, []);

//   // const fetchMbtiOptions = async () => {
//   //   try {
//   //     const response = await fetch("http://localhost:8000/api/mbti-options");
//   //     if (response.ok) {
//   //       const data = await response.json();
//   //       setMbtiOptions(data.mbtis);
//   //     } else {
//   //       console.error("Response not OK");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching MBTI options:", error);
//   //   }
//   // };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = {
//       username: formData.username,
//       email: formData.email,
//       // # we're trying hashed password
//       password: formData.password,
//       full_name: formData.full_name,
//       mbti_id: formData.mbti_id,
//       city: formData.city,
//       state: formData.state,
//     };
//     console.log(data)
//     const usersUrl = "http://localhost:8000/api/users/";
//     const fetchConfig = {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const response = await fetch(usersUrl, fetchConfig);
//     if (response.ok) {
//       const responseData = await response.json();
//       console.log(responseData);

//       setFormData({
//         username: "",
//         email: "",
//         password: "",
//         full_name: "",
//         mbti_id: "",
//         city: "",
//         state: "",
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <BootstrapInput
//         id="username"
//         name="username"
//         placeholder="Enter username"
//         labelText="Username"
//         value={formData.username}
//         onChange={handleInputChange}
//         type="text"
//       />
//       <BootstrapInput
//         id="email"
//         name="email"
//         placeholder="you@example.com"
//         labelText="Email"
//         value={formData.email}
//         onChange={handleInputChange}
//         type="email"
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
//       <BootstrapInput
//         id="full_name"
//         name="full_name"
//         placeholder="Enter Full Name"
//         labelText="Full Name"
//         value={formData.full_name}
//         onChange={handleInputChange}
//         type="text"
//       />
//       <BootstrapInput
//         id="city"
//         name="city"
//         placeholder="Enter City"
//         labelText="City"
//         value={formData.city}
//         onChange={handleInputChange}
//         type="text"
//       />
//       <BootstrapInput
//         id="state"
//         name="state"
//         placeholder="Enter State"
//         labelText="State"
//         value={formData.state}
//         onChange={handleInputChange}
//         type="text"
//       />
//       <div>
//         <label htmlFor="mbti_id">MBTI</label>
//           <select
//             id="mbti_id"
//             name="mbti_id"
//             value={formData.mbti_id}
//             onChange={handleInputChange}
//         >
//             {/* {Array.isArray(mbtiOptions) && mbtiOptions.map((option) => {
//                 return (
//                     <option key={option.id} value={option.id}>
//                         {option.score}
//                     </option>
//                 );
//             })} */}
//             {mbtiOptions.map((option) => {
//                 return (
//                     <option key={option.id} value={option.id}>
//                         {option.score}
//                     </option>
//                 );
//             })}
//         </select>
//       </div>
//       <button type="submit" className="btn btn-primary">
//         Sign Up!
//       </button>
//     </form>
//   );
// };

// export default SignupForm;


// import React, { useState, useEffect } from 'react';
// import styles from "./styling/Signup.module.css";
// import { Link } from "react-router-dom";
// import Logo from "./styling/Logo.png";

// const SignupForm = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     full_name: "",
//     mbti_id: "",
//     // city: "",
//     // state: "",
//   });
//   const [mbtiOptions, setMbtiOptions] = useState([]);


//   const fetchMbtiOptions = async () => {
//       const mbtiUrl = 'http://localhost:8000/api/mbti-options';

//       const mbtiResponse = await fetch(mbtiUrl);

//       if (mbtiResponse.ok) {
//         const mbtiData = await mbtiResponse.json();
//         console.log('Type of mbtiData:', typeof mbtiData);
//         console.log('Value of mbtiData:', mbtiData);
//         setMbtiOptions(mbtiData.mbtis);
//       } else {
//         console.error('Server responded with status', mbtiResponse.status);
//         try {
//           const errorData = await mbtiResponse.json();
//           console.error('Server response:', errorData);
//         } catch (err) {
//           console.error('Could not parse server response');
//         }
//       }
//     }

//   useEffect(() => {
//     fetchMbtiOptions();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = {
//       username: formData.username,
//       email: formData.email,
//       // # we're trying hashed password
//       password: formData.password,
//       full_name: formData.full_name,
//       mbti_id: formData.mbti_id,
//       city: formData.city,
//       state: formData.state,
//     };
//     console.log(data)
//     const usersUrl = "http://localhost:8000/api/users/";
//     const fetchConfig = {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const response = await fetch(usersUrl, fetchConfig);
//     if (response.ok) {
//       const responseData = await response.json();
//       console.log(responseData);

//       setFormData({
//         username: "",
//         email: "",
//         password: "",
//         full_name: "",
//         mbti_id: "",
//         // city: "",
//         // state: "",
//       });
//     }
//   };




//   return (
//     <form onSubmit={handleSubmit}>
//       <div className={styles["signup"]}>
//         <div className={styles["signup2"]}>
//           <div className={styles["signup-page"]}>
//             <div className={styles["rectangle-2"]}></div>

//             <div className={styles["rectangle-1"]}></div>

//             <div className={styles["already-have-an-account-login"]}>
//               <span>
//                 <span className={styles["already-have-an-account-login-span"]}>
//                   Already have an account?{" "}
//                 </span>
//                 <Link
//                   className={styles["already-have-an-account-login-span2"]}
//                   to="/login"
//                 >
//                   Login
//                 </Link>
//               </span>
//             </div>

//             <div className={styles["create-an-account"]}>Create an Account</div>

//             <div className={styles["input-name"]}>
//               <input
//                 id="full_name"
//                 name="full_name"
//                 className={styles["full-name"]}
//                 type="text"
//                 placeholder="Full Name"
//                 onChange={handleInputChange}
//                 value={formData.full_name}
//               />
//             </div>
//             <div className={styles["input-name"]}>
//               <input
//                 id="username"
//                 name="username"
//                 className={styles["username"]}
//                 type="text"
//                 placeholder="Username"
//                 onChange={handleInputChange}
//                 value={formData.username}
//               />
//             </div>
//             <div className={styles["input-name"]}>
//               <input
//                 id="email"
//                 name="email"
//                 className={styles["email"]}
//                 type="text"
//                 placeholder="Email"
//                 onChange={handleInputChange}
//                 value={formData.email}
//               />
//             </div>
//           </div>
//           <div className={styles["input-name"]}>
//             <input
//               id="password"
//               name="password"
//               className={styles["password"]}
//               type="password"
//               placeholder="Password"
//               onChange={handleInputChange}
//               value={formData.password}
//             />
//           </div>
//           <div className={styles["rectangle-8"]}>
//             <input
//               id="city"
//               name="city"
//               className={styles["city"]}
//               type="text"
//               placeholder="City"
//               onChange={handleInputChange}
//               value={formData.city}
//             />
//             <div className={styles["line-14"]}></div>
//           </div>
//         </div>
//         <div className={styles["rectangle-9"]}>
//           <input
//             id="state"
//             name="state"
//             className={styles["state"]}
//             type="text"
//             placeholder="State"
//             onChange={handleInputChange}
//             value={formData.state}
//           />
//         </div>
//         <select
//           id="mbti_id"
//           className={styles["mbti"]}
//           name="mbti_id"
//           value={formData.mbti_id}
//           onChange={handleInputChange}
//         >
//           {mbtiOptions.map((option) => {
//             return (
//               <option key={option.id} value={option.id}>
//                 {option.score}
//               </option>
//             );
//           })}
//         </select>
//       </div>

//       <button type="submit" className={styles["rectangle-7"]}>
//         Create Account
//       </button>

//       <div className={styles["find-match-and-meet-halfway"]}>
//         <span>
//           <span className={styles["find-match-and-meet-halfway-span"]}>
//             FIND, MATCH, AND MEET{" "}
//           </span>
//           <span className={styles["find-match-and-meet-halfway-span2"]}>
//             HALFWAY
//           </span>
//         </span>
//       </div>
//       <img className={styles["logo-1"]} src={Logo} alt="Logo" />
//     </form>
//   );
// };

// export default SignupForm;















import React, { useState, useEffect } from 'react';
import styles from "./styling/Signup.module.css";
import { Link } from "react-router-dom";
import Logo from "./styling/Logo.png";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
    mbti_id: "",
    // city: "",
    // state: "",
    gender: "",
    bio: "",
    interests: [],
    picture: "",
    zipcode: "",
    age: "",
  });
  const [mbtiOptions, setMbtiOptions] = useState([]);


  const fetchMbtiOptions = async () => {
      const mbtiUrl = 'http://localhost:8000/api/mbti-options';

      const mbtiResponse = await fetch(mbtiUrl);

      if (mbtiResponse.ok) {
        const mbtiData = await mbtiResponse.json();
        console.log('Type of mbtiData:', typeof mbtiData);
        console.log('Value of mbtiData:', mbtiData);
        setMbtiOptions(mbtiData.mbtis);
      } else {
        console.error('Server responded with status', mbtiResponse.status);
        try {
          const errorData = await mbtiResponse.json();
          console.error('Server response:', errorData);
        } catch (err) {
          console.error('Could not parse server response');
        }
      }
    }

  useEffect(() => {
    fetchMbtiOptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      full_name: formData.full_name,
      mbti_id: formData.mbti_id,
      // city: formData.city,
      // state: formData.state,
      gender: formData.gender,
      bio: formData.bio,
      interests: formData.interests,
      picture: formData.picture,
      zipcode: formData.zipcode,
      age: formData.age,
    };
    console.log(data)
    const usersUrl = "http://localhost:8000/api/users/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(usersUrl, fetchConfig);
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);

      setFormData({
        username: "",
        email: "",
        password: "",
        full_name: "",
        mbti_id: "",
        gender: "",
        bio: "",
        interests: [],
        picture: "",
        zipcode: "",
        age: "",
      });
    }
  };




  return (
    <form onSubmit={handleSubmit}>
      <div className={styles["signup"]}>
        <div className={styles["signup2"]}>
          <div className={styles["signup-page"]}>
            <div className={styles["rectangle-2"]}></div>
            <div className={styles["rectangle-1"]}></div>
            <div className={styles["already-have-an-account-login"]}>
              <span>
                <span className={styles["already-have-an-account-login-span"]}>
                  Already have an account?{" "}
                </span>
                <Link
                  className={styles["already-have-an-account-login-span2"]}
                  to="/login"
                >
                  Login
                </Link>
              </span>
            </div>
            <div className={styles["create-an-account"]}>Create an Account</div>
            <div className={styles["input-name"]}>
              <input
                id="full_name"
                name="full_name"
                className={styles["full-name"]}
                type="text"
                placeholder="Full Name"
                onChange={handleInputChange}
                value={formData.full_name}
              />
            </div>
            <div className={styles["input-name"]}>
              <input
                id="username"
                name="username"
                className={styles["username"]}
                type="text"
                placeholder="Username"
                onChange={handleInputChange}
                value={formData.username}
              />
            </div>
            <div className={styles["input-name"]}>
              <input
                id="email"
                name="email"
                className={styles["email"]}
                type="text"
                placeholder="Email"
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>
            <div className={styles["input-name"]}>
              <input
                id="password"
                name="password"
                className={styles["password"]}
                type="password"
                placeholder="Password"
                onChange={handleInputChange}
                value={formData.password}
              />
            </div>
            <div className={styles["input-name"]}>
              <input
                id="gender"
                name="gender"
                className={styles["gender"]}
                type="text"
                placeholder="Gender"
                onChange={handleInputChange}
                value={formData.gender}
              />
            </div>
            <div className={styles["input-name"]}>
              <input
                id="bio"
                name="bio"
                className={styles["bio"]}
                type="text"
                placeholder="Bio"
                onChange={handleInputChange}
                value={formData.bio}
              />
            </div>
            <div className={styles["input-name"]}>
              <input
                  id="interests"
                  name="interests"
                  className={styles["interests"]}
                  type="text"
                  placeholder="Interests"
                  onChange={e => {
                      setFormData({ ...formData, interests: e.target.value.split(',') });
                  }}
                  value={formData.interests.join(',')}
              />
            </div>
            <div className={styles["input-name"]}>
              <input
                id="picture"
                name="picture"
                className={styles["picture"]}
                type="text"
                placeholder="Picture"
                onChange={handleInputChange}
                value={formData.picture}
              />
            </div>
            <div className={styles["input-name"]}>
              <input
                id="zipcode"
                name="zipcode"
                className={styles["zipcode"]}
                type="text"
                placeholder="Zipcode"
                onChange={handleInputChange}
                value={formData.zipcode}
              />
            </div>
            <div className={styles["input-name"]}>
              <input
                id="age"
                name="age"
                className={styles["age"]}
                type="number"
                placeholder="Age"
                onChange={handleInputChange}
                value={formData.age}
              />
            </div>
            <select
              id="mbti_id"
              className={styles["mbti"]}
              name="mbti_id"
              value={formData.mbti_id}
              onChange={handleInputChange}
            >
              {mbtiOptions.map((option) => {
                return (
                  <option key={option.id} value={option.id}>
                    {option.score}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <button type="submit" className={styles["rectangle-7"]}>
        Create Account
      </button>
      <div className={styles["find-match-and-meet-halfway"]}>
        <span>
          <span className={styles["find-match-and-meet-halfway-span"]}>
            FIND, MATCH, AND MEET{" "}
          </span>
          <span className={styles["find-match-and-meet-halfway-span2"]}>
            HALFWAY
          </span>
        </span>
      </div>
      <img className={styles["logo-1"]} src={Logo} alt="Logo" />
    </form>
  );
};

export default SignupForm;
