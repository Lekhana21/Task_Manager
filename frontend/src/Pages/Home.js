import React from "react";
import{Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

import '../styles/Home.css';
import img from "../assets/img.jpg"; 
const Home =()=>{
    const navigate=useNavigate();
    const token = localStorage.getItem("token");



    const handleLogin=()=>{
        if(token){
            navigate("/DashBoard");
        }else{
            navigate("/LoginPage");
        }
        
    };
    return (
        <div className="home"
                    style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
            }}
        >

        <h1>Welcome to the Task Manager</h1>
        {/*<button onClick={handleLogin}>Login</button>*/}
        <div className="Buttons">
        <Link to="/LoginPage"><button>Login</button></Link>
        <Link to="/SignUpPage"><button>Register</button></Link>
        </div>

    </div>
    );
   

};

export default Home;