import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Routes,BrowserRouter,Link, Route } from "react-router-dom";
import VaccinationSearch from './VaccinationSearch';
import Vaccination from './Vaccination';
import 'bootstrap/dist/css/bootstrap.min.css';
import VaccinationCentre from './VaccinationCentre';
import TestCentre from './TestCentre';
import LiveStatistics from './LiveStatistics';
import Medication from './Medication';
import TestSymptoms from './TestSymptoms';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/vaccine_search/:id"  element={<VaccinationSearch />} />
      <Route path="/get_vaccine" element={<Vaccination />} />
      <Route path="/vaccine_centre/:id" element={<VaccinationCentre />} />
      <Route path="/testCenters" element={<TestCentre />} />
      <Route path="/liveStatistics" element={<LiveStatistics/>} />
      <Route path="/Medication" element={<Medication/>} />
      <Route path="/TestSymptoms" element={<TestSymptoms/>} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
