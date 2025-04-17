import "../styles/Auth.css";
import"../index.css";
import React,{useState} from "react";
import axios from "axios";
import {useNavigate}from "react-router-dom";

function LoginPage(){
    const[formdata,setformdata] =useState({
        email:"",
        password:"",
    });
    const[status,setstatus] = useState({type:"",message:""});
    const navigate=useNavigate();


    const isFormValid=()=>{
        return formdata.email.trim()!==""&&formdata.password.trim()!=="";
    };








    const handlechange =(e)=>{
        const{name,value}=e.target;
        setformdata((prev)=>({...prev,[name]:value}));
    };
    const handlesubmit=async(e)=>{
        e.preventDefault();
        if(!isFormValid()){
            setstatus({type:"warning",message :"please enter both email and password"});
            return;
        }
        try{
            const{data}=await axios.post("http://localhost:5000/api/auth/login",formdata);
            console.log("Logged in:",data);
            localStorage.setItem("token",data.token);

            navigate("/dashboard");

        }catch(err){
            console.error("Error:",err.response?.data||err.message);
            setstatus({type:"error",message:err.response?.data.message??"Login failed!"});
        }

    };
    return (
        <div className="signup">
            <div className ="form-box">
            <h2>Login</h2>
            {/*show status message oif any */}
            {status.message&&(<p className={`status-message ${status.type}`}>{status.message}</p>)}
            <form onSubmit={handlesubmit}>
                <div className="authfield">
                    <label>Email:</label>
                    <input 
                      type="email"
                    name="email"
                    value={formdata.email}
                    onChange={handlechange}
                    required/>
                </div>
                <div className="authfield">
                    <label>Password</label>
                    <input
                    type ="password"
                    name="password"
                    value={formdata.password}
                    onChange={handlechange}
                    required/>
                </div>
                <button type="Submit" className="authButton">Login</button>
            </form>
            </div>
        </div>
    );
}

export default LoginPage;