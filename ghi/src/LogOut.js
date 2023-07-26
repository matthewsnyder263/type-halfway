// import React from "react";
// import { useHistory } from "react-router-dom";

// const Logout = () => {
//   const history = useHistory();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     history.push("/login");
//   };

//   return (
//     <button onClick={handleLogout} className="btn btn-primary">
//       Logout
//     </button>
//   );
// };

// export default Logout;

import React from "react";
import { logout } from "./auth";

function LogOut() {
  const handleLogOut = () => {
    logout();
    alert("You have logged out.");
  };

  return (
    <div>
      <h2>You are logged in</h2>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
}

export default LogOut;

// import React from "react";

// function LogOut() {
//   const handleLogOut = () => {
//     localStorage.clear();
//     alert("You have logged out using the logout feature, Nice Work.");
//   };

//   return (
//     <div>
//       <h2>You are logged in</h2>
//       <button onClick={handleLogOut}>Log Out</button>
//     </div>
//   );
// }

// export default LogOut;
