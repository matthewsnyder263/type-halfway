// import React, { useState, useEffect } from "react";
// import BootstrapInput from "../BootstrapInput";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import { useNavigate } from "react-router-dom";


// const initialFormData = {
//   username: "",
//   full_name: "",
//   email: "",
//   gender: "",
//   age: "",
//   mbti: "",
//   password: "",
//   bio: "",
//   zip_code: "",
//   interest: "",
//   picture: "",
// }
// const initialGenders = ['Male', 'Female', 'Non-Binary', 'Other']

// const SignupForm = () => {
//   const [formData, setFormData] = useState(initialFormData)
//   const [genders, setGender] = useState(initialGenders)
//   const { register, login, token } = useToken();
//   const navigate = useNavigate();



//   // useEffect(() => {
//   //   fetchGenders();
//   // }, []);

//   // useEffect(() => {
//   //   if (token) {
//   //     fetchUser();
//   //   }
//   // }, [token]);

//   // const fetchUser = async () => {
//   //   const url = 'http://localhost:8000/token';
//   //   const response = await fetch(url, {
//   //     method: "GET",
//   //     credentials: "include",
//   //   });
//   //   // console.log("response", response)
//   //   if (response.ok) {
//   //     const data = await response.json();
//   //     // console.log("account", data.account)
//   //     if (data === null) {
//   //       // handleInvalid();
//   //     } else {
//   //       localStorage.setItem('user', JSON.stringify(data.account));
//   //       // console.log("data.account", data.account)
//   //       navigate("/profile");
//   //     }
//   //   }
//   // };


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = { ...formData };
//     console.log("FORM data", data);

//     try {
//       register(
//         data,
//         `${process.env.REACT_APP_API_HOST}/api/users`
//       );
//       try {
//         await login(data.username, data.password)
//         // fetchUser()
//       } catch (error) {
//         console.error("Login failed with exception:", error);
//       }
//       e.target.reset();
//       // navigate("/profile");
//       setFormData(initialFormData)
//       setGender(initialGenders)
//       // } else {
//       //   console.error("Server responded with status", response.status)
//       //   const errorData = await response.json();
//       //   console.error("Server response:", errorData)
//       // }
//     } catch (error) {
//       console.error("Error creating user:", error)
//     }
//   };

//   return (
//     <div className="container">
//       <div className="offset-3 col-6">
//         <div className="shadow p-4 mt-4">
//           <h2>Sign Up</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="form-floating mb-3">
//               <BootstrapInput
//                 id="username"
//                 name="username"
//                 placeholder="Enter username"
//                 labelText="Username"
//                 value={formData.username}
//                 onChange={handleInputChange}
//                 type="text"
//               />
//             </div>
//             <div className="form-floating mb-3">
//               <BootstrapInput
//                 id="email"
//                 name="email"
//                 placeholder="you@example.com"
//                 labelText="Email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 type="email"
//               />
//             </div>
//             <div className="form-floating mb-3">
//               <BootstrapInput
//                 id="password"
//                 name="password"
//                 placeholder="Enter password"
//                 labelText="Password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 type="password"
//               />
//             </div>
//             <div className="form-floating mb-3">
//               <BootstrapInput
//                 id="full_name"
//                 name="full_name"
//                 placeholder="Enter Full Name"
//                 labelText="Full Name"
//                 value={formData.full_name}
//                 onChange={handleInputChange}
//                 type="text"
//               />
//             </div>
//             <div className="form-floating mb-3">
//               <BootstrapInput
//                 id="age"
//                 name="age"
//                 placeholder="Age"
//                 labelText="Age"
//                 value={formData.age}
//                 onChange={handleInputChange}
//                 type="number"
//                 max="100"
//               />
//             </div>
//             <div className="form-floating mb-3">
//               <BootstrapInput
//                 id="mbti"
//                 name="mbti"
//                 placeholder="Enter mbti"
//                 labelText="mbti"
//                 value={formData.mbti}
//                 onChange={handleInputChange}
//                 type="text"
//               />
//             </div>
//             <div className="form-floating mb-3">
//               <BootstrapInput
//                 id="bio"
//                 name="bio"
//                 placeholder="Enter Bio"
//                 labelText="Bio"
//                 value={formData.bio}
//                 onChange={handleInputChange}
//                 type="text"
//               />
//             </div>
//             <div className="form-floating mb-3">
//               <BootstrapInput
//                 id="zip_code"
//                 name="zip_code"
//                 placeholder="Enter Zip-code"
//                 labelText="Zip-code"
//                 value={formData.zip_code}
//                 onChange={handleInputChange}
//                 type="number"
//               />
//             </div>
//             <div className="form-floating mb-3">
//               <BootstrapInput
//                 id="interest"
//                 name="interest"
//                 placeholder="Enter Interest"
//                 labelText="Interest"
//                 value={formData.interest}
//                 onChange={handleInputChange}
//                 type="text"
//               />
//             </div>
//             <BootstrapInput
//               id="picture"
//               name="picture"
//               placeholder="Enter Picture URL"
//               labelText="Picture URL"
//               value={formData.picture}
//               onChange={handleInputChange}
//               type="text"
//             />
//             <div className="mb-3">
//               <select
//                 id="gender"
//                 name='gender'
//                 className="form-control"
//                 placeholder="Select you gender"
//                 value={formData.gender}
//                 onChange={handleInputChange}
//                 type="text"
//               >
//                 <option selected disabled>Select your gender</option>
//                 {genders.map((gender) => {
//                   return (
//                     <option key={gender} value={gender}>{gender}</option>
//                   )
//                 })}
//               </select>
//             </div>
//             <div >
//               <button type="submit" className="btn btn-primary">
//                 Sign Up!
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SignupForm;





// let usersUrl = "http://localhost:8000/api/users/"
// const fetchConfig = {
//   method: "POST",
//   body: JSON.stringify(data),
//   headers: {
//     "Content-Type": "application/json",
//   },
// };

// const response = await fetch(usersUrl, fetchConfig)
// console.log("SignUp response", response);

// if (response.ok) {
//   const responseData = await response.json();
//   console.log('Response Data after POST', responseData)

// const data = { ...formData }
// username: formData.username,
// email: formData.email,
// password: formData.password,
// full_name: formData.full_name,
// mbti: formData.mbti,
// age: formData.age,
// bio: formData.bio,
// interest: formData.interest,
// picture: formData.picture,
// };


// const fetchGenders = async () => {
//   let url = 'http://localhost:8000/api/genders'
//   let response = await fetch(url);
//   console.log('Gender Response', response)
//   if (response.ok) {
//     let data = await response.json();
//     console.log('data', data)
//     setGenders(data.genders)
//   } else {
//     console.log("drat! something happened");
//   }
// }


import React, { useState, useEffect } from "react";
import BootstrapInput from "../BootstrapInput";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    email: "",
    gender: "",
    age: "",
    mbti: "",
    password: "",
    bio: "",
    zip_code: "",
    interest: "",
    picture: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: formData.username,
      full_name: formData.full_name,
      email: formData.email,
      gender: formData.gender,
      age: formData.age,
      mbti: formData.mbti,
      password: formData.password,
      bio: formData.bio,
      zip_code: formData.password,
      interest: formData.interest,
      picture: formData.picture,
    };
    console.log("FORM data", data);

    try {
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
          full_name: "",
          email: "",
          gender: "",
          age: "",
          mbti: "",
          password: "",
          bio: "",
          zip_code: "",
          interest: "",
          picture: "",
        });
      } else {
        console.error("Server responded with status", response.status);
        const errorData = await response.json();
        console.error("Server response:", errorData);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="container">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <BootstrapInput
                id="username"
                name="username"
                placeholder="Enter username"
                labelText="Username"
                value={formData.username}
                onChange={handleInputChange}
                type="text"
              />
            </div>
            <div className="form-floating mb-3">
              <BootstrapInput
                id="email"
                name="email"
                placeholder="you@example.com"
                labelText="Email"
                value={formData.email}
                onChange={handleInputChange}
                type="email"
              />
            </div>
            <div className="form-floating mb-3">
              <BootstrapInput
                id="password"
                name="password"
                placeholder="Enter password"
                labelText="Password"
                value={formData.password}
                onChange={handleInputChange}
                type="password"
              />
            </div>
            <div className="form-floating mb-3">
              <BootstrapInput
                id="full_name"
                name="full_name"
                placeholder="Enter Full Name"
                labelText="Full Name"
                value={formData.full_name}
                onChange={handleInputChange}
                type="text"
              />
            </div>
            <div className="form-floating mb-3">
              <BootstrapInput
                id="age"
                name="age"
                placeholder="Age"
                labelText="Age"
                value={formData.age}
                onChange={handleInputChange}
                type="number"
                max="100"
              />
            </div>
            <div className="form-floating mb-3">
              <select
                id="mbti"
                name="mbti"
                className="form-control"
                placeholder="Select your MBTI type"
                value={formData.mbti}
                onChange={handleInputChange}
                type="text"
              >
                <option value="" disabled>
                  Select your MBTI type
                </option>
                <option value="INTJ">INTJ</option>
                <option value="INTP">INTP</option>
                <option value="ENTJ">ENTJ</option>
                <option value="ENTP">ENTP</option>
                <option value="INFJ">INFJ</option>
                <option value="INFP">INFP</option>
                <option value="ENFJ">ENFJ</option>
                <option value="ENFP">ENFP</option>
                <option value="ISTJ">ISTJ</option>
                <option value="ISTP">ISTP</option>
                <option value="ESTJ">ESTJ</option>
                <option value="ESTP">ESTP</option>
                <option value="ISFJ">ISFJ</option>
                <option value="ISFP">ISFP</option>
                <option value="ESFJ">ESFJ</option>
                <option value="ESFP">ESFP</option>
              </select>
            </div>
            <div className="form-floating mb-3">
              <BootstrapInput
                id="bio"
                name="bio"
                placeholder="Enter Bio"
                labelText="Bio"
                value={formData.bio}
                onChange={handleInputChange}
                type="text"
              />
            </div>
            <div className="form-floating mb-3">
              <BootstrapInput
                id="zip_code"
                name="zip_code"
                placeholder="Enter Zip-code"
                labelText="Zip-code"
                value={formData.zip_code}
                onChange={handleInputChange}
                type="number"
              />
            </div>
            <div className="form-floating mb-3">
              <BootstrapInput
                id="interest"
                name="interest"
                placeholder="Enter Interest"
                labelText="Interest"
                value={formData.interest}
                onChange={handleInputChange}
                type="text"
              />
            </div>
            <BootstrapInput
              id="picture"
              name="picture"
              placeholder="Enter Picture URL"
              labelText="Picture URL"
              value={formData.picture}
              onChange={handleInputChange}
              type="text"
            />
            <div className="mb-3">
              <select
                id="gender"
                name="gender"
                className="form-control"
                placeholder="Select your gender"
                value={formData.gender}
                onChange={handleInputChange}
                type="text"
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div >
              <button type="submit" className="btn btn-primary">
                Sign Up!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
