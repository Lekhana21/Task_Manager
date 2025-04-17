import '../styles/Auth.css';
import {useNavigate} from 'react-router-dom';
import React, {useState} from "react";
import axios from "axios";

function SignUpPage(){
    const[details,setDetails] = useState({
        username:"",
        useremail:"",
        userpassword:"",
    });
    const[message1,setThemessage]=useState("");
    const updateInput=(e)=>{
        setDetails({...details,[e.target.name]:e.target.value});
    };

    const navigate=useNavigate();

    const submitform=async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:5000/api/auth/register",{
            name: details.username,
            email:details.useremail,
            password:details.userpassword,


            });
            if(res.status===200||res.status===201){
                localStorage.setItem("token",res.data.token);
                setThemessage("Account created successfully");
                console.log("Successfully Registered" , res.data);
                setDetails({
                    username:"",
                    useremail:"",
                    userpassword:"",
 
                });
                setTimeout(()=>{
                    navigate("/dashboard");
                },1000);
            }else{
                setThemessage("Error");
            }



        }catch(error){
            const msg = error?.response?.data?.message || "Server error. Please try again.";
            setThemessage(`Error: ${msg}`);
            console.log("Registration Failed ", error?.response?.data||error.message);

        }
    };

    return (
        
            <div className='signup'>
                <div className='form-box'>
            <h2>Create an Account</h2>
            {message1&&
            <p style={{color:message1.startsWith("Done")?"green":"red", marginBottom:"10px",fontWeight:"bold"}}>{message1}</p>}
            <form onSubmit = {submitform}>
                <div className="authfield">
                    <label>Enter Your Name: </label>
                    <input 
                      type="text"
                      name="username"
                      value={details.username}
                      onChange={updateInput}
                      required/>
                </div>
                <div className="authfield">
                    <label>Enter Your Email ID:</label>
                    <input 
                        type = "email"
                        name = "useremail"
                        value={details.useremail}
                        onChange ={updateInput}
                        required/>    
                </div>
                <div className="authfield">
                    <label>Set a Password :</label>
                    <input 
                       type = "password"
                       name = "userpassword"
                       value ={details.userpassword}
                       onChange={updateInput}
                       required/>
                </div>
                <button type="submit" className="authButton">Register</button>
            </form>
            </div>
            
        </div>
    );




}

export default SignUpPage;