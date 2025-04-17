const express=require("express");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
//for new user register
router.post("/register",async(request,response)=>{
    console.log("Received:",request.body);
    const{name,email,password}=request.body;
    
    try{
        //to check if the user alreasdy exists
        const checkuser=await User.findOne({email});
        if(checkuser){
            return response.status(400).json({message :"EMail is taken"});

        }
        //hash passwork before saving
        const hashed = await bcrypt.hash(password,10);
        const newuser = new User({
            name,
            email,
            password:hashed,
        });

        //save to db
        await newuser.save();
        //token generation for new user
        const token=jwt.sign({id:newuser._id},process.env.JWT_SECRET,{
            expiresIn:"1h",
        });
        response.status(201).json({message: "user acc created",token});
    
    }catch(e){
        console.log("Register Error:",e.message);
        response.status(500).json({message:"Something went wrong"});
    }
});
//to login
router.post("/login",async(request,response)=>{
    const{email,password}=request.body;
    try{
        //find the user email
        const founduser=await User.findOne({email});
        if(!founduser){
            return response.status(400).json({message:"Wrong email or password"});

        }
        //compare password
        const passwordmatch=await bcrypt.compare(password,founduser.password);
        if(!passwordmatch){
            return response.status(400).json({message:"Wrong email or password"});
        }
        //create jwt
        const token =jwt.sign({id:founduser._id},process.env.JWT_SECRET,{
            expiresIn:"1h",
        });
        response.json({message:"Login Done!",token});
    }catch(err){
        console.log("Login Error:",err.message);
        response.status(500).json({message:"Server crash or bug"});

    }
});

module.exports = router;
