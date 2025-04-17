const dotenv=require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const taskRoutes = require("./backendrequirement/tasks");

const mongoose=require("mongoose");
const authenticationRoutes=require("./backendrequirement/auth");

//dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());


//connect to mongoDb
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoBD connected"))
    .catch((err)=>console.error("MongoDB connection failed:",err));



app.use("/api/auth",authenticationRoutes);

app.use("/api/tasks",taskRoutes);


app.get("/",(request,response)=>{
    response.send("API is runnning");
});
app.listen(5000,()=>{
    console.log("Server is running on http://localhost:5000");
});



