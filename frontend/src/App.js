//import logo from './logo.svg';
import './styles/App.css';

import{BrowserRouter as Router,Routes,Route} from "react-router-dom";
import LoginPage from "./requirements/LoginPage";
import SignUpPage from './requirements/SignUpPage';
import DashBoard from "./Pages/DashBoard";
import Home from "./Pages/Home";
import React from "react";










function App() {
  const token=localStorage.getItem("token");//get th etoken
  return (

    <Router>
      <Routes>
        <Route path ="/" element ={<Home/>}/>
        <Route path="/LoginPage" element ={<LoginPage/>}/>
        <Route path="/SignUpPage" element ={<SignUpPage/>}/>
        <Route path="/dashboard" element ={<DashBoard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
