//import logo from './logo.svg';
import './styles/App.css';
import bg from "./assets/img.jpg";

import{BrowserRouter as Router,Routes,Route} from "react-router-dom";
import LoginPage from "./requirements/LoginPage";
import SignUpPage from './requirements/SignUpPage';
import DashBoard from "./Pages/DashBoard";
import Home from "./Pages/Home";
import React from "react";










function App() {
  const token=localStorage.getItem("token");//get th etoken
  return (
    <div 
    style={{
      backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh"
      
    }}
    >

    <Router basename="/Task_Manager">
      <Routes>
        <Route path ="/" element ={<Home/>}/>
        <Route path="/LoginPage" element ={<LoginPage/>}/>
        <Route path="/SignUpPage" element ={<SignUpPage/>}/>
        <Route path="/dashboard" element ={<DashBoard/>}/>
      </Routes>
    </Router>
  </div>  
  );
}

export default App;
