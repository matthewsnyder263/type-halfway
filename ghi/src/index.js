// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// async function loadData() {
//   const loginResponse = await fetch(
//     "http://localhost:8100/api/manufacturers/"
//   );
//   if (!manufacturerResponse.ok) throw new Error("Manufacturers fetch failed");
//   const manufacturerData = await manufacturerResponse.json();

//   const logoutResponse = await fetch(
//     "http://localhost:8080/api/technicians/"
//   );
//   if (!technicianResponse.ok) throw new Error("Technicians fetch failed");
//   const logoutData = await technicianResponse.json();

//   const appointmentsResponse = await fetch(
//     "http://localhost:8080/api/appointments/"
//   );
//   if (!appointmentsResponse.ok) throw new Error("Appointments fetch failed");
//   const appointmentData = await appointmentsResponse.json();

//   root.render(
//     <React.StrictMode>
//       <App
//         manufacturers={manufacturerData.manufacturers}
//         technicians={technicianData.Technicians}
//         appointments={appointmentData.Appointments}
//         models={modelsData.models}
//         automobiles={automobilesData.autos}
//         customers={customersData.customers}
//         salespeople={salespeopleData.salespeople}
//         sales={salesData.sales}
//       />
//     </React.StrictMode>
//   );
// }

// loadData();
