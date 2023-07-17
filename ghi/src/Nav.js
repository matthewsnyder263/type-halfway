// import React from 'react';
// import { NavLink } from "react-router-dom";
// import "./index.css";

// function Nav() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-success ">
//       <div className="container-fluid">
//         <NavLink
//           className="navbar-brand d-flex flex-column align-items-center"
//           to="/"
//         >
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbqNx3IE9hBOozWSCy-aBDCXAZAkvKv2KbexAiTG_iGw&usqp=CAU&ec=48665701"
//             alt=""
//             width="100"
//             height="75"
//           />
//           <div>CarCar</div>
//         </NavLink>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <div className="row">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item dropdown">
//                 <NavLink
//                   className="nav-link dropdown-toggle"
//                   to="#"
//                   id="navbarDropdownAutomotives"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   Automotives
//                 </NavLink>
//                 <ul className="dropdown-menu">
//                   <li>
//                     <NavLink className="dropdown-item" to="manufacturers">
//                       Manufacturers
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       className="dropdown-item"
//                       to="manufacturers/create"
//                     >
//                       Create a manufacturer
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink className="dropdown-item" to="/models">
//                       Models
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink className="dropdown-item" to="/models/new">
//                       Create a model
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink className="dropdown-item" to="automobiles">
//                       Automobiles
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink className="dropdown-item" to="/automobiles/new">
//                       Create an automobile
//                     </NavLink>
//                   </li>
//                 </ul>
//               </li>
//               <li className="nav-item dropdown">
//                 <NavLink
//                   className="nav-link dropdown-toggle"
//                   to="#"
//                   id="navbarDropdownSales"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   Sales
//                 </NavLink>
//                 <ul className="dropdown-menu">
//                   <li>
//                     <NavLink className="dropdown-item" to="/salespeople">
//                       Salespeople
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink className="dropdown-item" to="/salespeople/new">
//                       Add a salesperson
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink className="dropdown-item" to="/customers">
//                       Customers
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink className="dropdown-item" to="/customers/new">
//                       Add a customer
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink className="dropdown-item" to="/sales">
//                       Sales
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink className="dropdown-item" to="/sales/new">
//                       Add a sale
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink className="dropdown-item" to="/sales/history">
//                       Salesperson History
//                     </NavLink>
//                   </li>
//                 </ul>
//               </li>
//               <li className="nav-item dropdown">
//                 <NavLink
//                   className="nav-link dropdown-toggle"
//                   to="#"
//                   id="navbarDropdownServices"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   Services
//                 </NavLink>
//                 <ul className="dropdown-menu">
//                   <li>
//                     <NavLink className="dropdown-item" to="technicians">
//                       Technicians
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink className="dropdown-item" to="technicians/create">
//                       Add a technician
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink className="dropdown-item" to="appointments">
//                       Service Appointments
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink className="dropdown-item" to="appointments/create">
//                       Create a service appointment
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       className="dropdown-item"
//                       to="appointments/history"
//                     >
//                       Service History
//                     </NavLink>
//                   </li>
//                 </ul>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Nav;
