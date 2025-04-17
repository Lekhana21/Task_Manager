const express = require("express");
const Task = require("../models/Task");
const authenticateuser=require("../middleware/auth");
const router = express.Router();


//CRUD operations
//get tasks
router.get("/",authenticateuser,async(request,response)=>{
    try{
        console.log("Fetching tasks...");
        const tasks=await Task.find();
        response.json(tasks);
        

    }catch(err){
        console.log("Error while getting tasks: ",err.messages);
        response.status(500).json({message:"Something is wrong"});
    }
});


router.post("/",authenticateuser,async(request,response)=>{
    console.log("Request body:",request.body);
    const{title,description,isComplete,category,duedate}=request.body;
    
    console.log("Creating task:",{title,description});

    
    if(!title||!description){
        return response.status(400).json({message:"Title and description is required"});
    }
    
   
    const task = new Task({
        title,
        description,
        isComplete:isComplete||false,
        category:category||"Uncategorized",
        duedate:duedate||null,
        //user: request.user._id,

    });
    try{
        const savedtask= await task.save();
        response.status(201).json(savedtask);

    }catch(err){
        console.log("Error while creating tasks: ",err.messages);
        response.status(400).json({message:"Could not create task"});
    }

});



router.put("/:id" ,authenticateuser,async(request,response)=>{
    const taskid=request.params.id;
    try{
        const task = await Task.findById(taskid);

        if(!task){
            return response.status(404).json({message:"Task not found"});
        }
        if(request.body.title) task.title=request.body.title;
        if(request.body.description)task.description=request.body.description;
        if(request.body.hasOwnProperty("isComplete")){
            task.isComplete=request.body.isComplete;
        }
        if(request.body.category) task.category=request.body.category;
        if(request.body.duedate) task.duedate=request.body.duedate;
        const updatedtask = await task.save();
        console.log("Updates tsak: ",updatedtask);
        response.json(updatedtask);
    }catch(error){
        console.log("Error updating task", error.message);
        response.status(400).json({message: "Update failed"});
        

    }
});





router.delete("/:id",authenticateuser,async(request,response)=>{
    const taskid=request.params.id;
    try{
        const task=await Task.findById(taskid);
        if(!task){
            return response.status(404).json({message: "Task not found"});

        }
        await task.deleteOne();
        console.log("Deleted task with ID:" ,taskid);
        response.json({message:"Task deleterd"});
    }catch(err){
        console.log("Error deleteing task: ",err.message);
        response.status(500).json({message:"Failed to delete task"})

    }
});

module.exports=router;