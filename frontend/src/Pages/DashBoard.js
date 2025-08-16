import "../styles/DashBoard.css";
import React,{useEffect,useState} from "react";
import TaskForm from "../varioustasks/TaskForm";
import TaskList from "../varioustasks/TaskList"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

//import img from '../assets/img.jpg'; 

const DashBoard =()=>{
    //const[notifiedTasksnoww,setNotifiedTasksnow]=useState({});
    //const[duedate,setTheDuedate]=useState("");
    const[StatusofFilter,FiltersetStatus]=useState("all");
    const[searchTerms,setSearchTerms]=useState("");

    const [filterCategory, setFilterCategory] = useState("all");

    const [tasks,TaskData]=useState([]);
    const [editingTask,setEditingTask]=useState(null);
    const navigate= useNavigate();
    const token = localStorage.getItem("token");
    
    



    









    
    const fetchTasks=async()=>{
        try{
            const response= await axios.get("http://localhost:5000/api/tasks",{
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            });
            TaskData(response.data);

        }catch(err){
            console.error("error fetching tasks:",err.message);
        }
    };
    
    //to filter task
    const filteredTasks= tasks.filter((task)=>{
        const matchesSearch = task.title.toLowerCase().includes(searchTerms.toLowerCase());

        const matchesStatus= StatusofFilter==="all"|| (StatusofFilter==="completed"&&task.isComplete)||(StatusofFilter==="pending"&&!task.isComplete);
        
       

        const matchesCategory =
        filterCategory === "all" || task.category === filterCategory;

        return matchesStatus && matchesSearch && matchesCategory;
        
        
       
    })














    
    useEffect(()=>{
        if(!token){
            navigate("/");

        }else{
            fetchTasks();
        }
    },[token,navigate]);
    

    

     












    
    const handleAddTask=async(taskData)=>{
        console.log("task data to send :",taskData);
        if(taskData.duedate){
            taskData.duedate=new Date(taskData.duedate);
        }
        try{
            const response= await axios.post("http://localhost:5000/api/tasks",taskData,{
                
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-Type":"application/json",
                    },

                
                
            });
            TaskData((prev)=>[...prev,response.data]);

        }catch(err){
            console.error("error adding task:",err.message);
        }
    };

    const handleEditClick=(taskid)=>{
        const tasksToEdit =tasks.find((task)=>task._id===taskid);
        setEditingTask(tasksToEdit);
    };
    
    const handleUpdateTask=async(id,updatedData)=>{
        try{
            const response= await axios.put(`http://localhost:5000/api/tasks/${id}`,updatedData,{

                headers:{
                    Authorization:`Bearer ${token}`,
                },
            });
            TaskData((prev)=>prev.map((task)=>(task._id===id?response.data:task)));
            setEditingTask(null);

        }catch(err){
            console.error("error updating task:",err.message);
        }
    };


    const handleDeleteTask =async(id)=>{
        try{
            await axios.delete(`http://localhost:5000/api/tasks/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`,

                },


            });
            TaskData((prev)=>prev.filter((task)=>task._id!==id));


        }catch(err){
            console.error("Error deleting task" ,err.message);
        }
    };

    
    const toggleComplete=async(task)=>{
        try{
            const response=await axios.put(`http://localhost:5000/api/tasks/${task._id}`,
                {isComplete:!task.isComplete},
                {
                    headers:{
                        Authorization:`Bearer ${token}`,
                    },
                }
            );
            TaskData((prevTasks)=>prevTasks.map((t)=>(t._id===task._id?response.data:t)));

        }catch(err){
            console.error("Couldnt update the task status",err.message);
        }
    };    




    
    
   
    
    return (
        <div className ="dashboard">
            <h1>Task DashBoard</h1>
            
            <div className="task-form">
            <TaskForm
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            editingTask={editingTask}
            />
            </div>
            

            <div className="barfilter">
                <input 
                type="text"
                placeholder="search by title"
                value={searchTerms}
                onChange={(e)=>setSearchTerms(e.target.value)}
                //style={{marginRight:"10px",padding:"5px"}}
                />

            

            <select 
            value={StatusofFilter}
            onChange={(e)=>FiltersetStatus(e.target.value)}
            style={{padding:"8px"}}
            >
             <option value ="all">All</option>   
             <option value ="completed">Completed</option>  
             <option value ="pending">Pending</option>  
            </select>


            
            
            

            <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ padding: "8px" }}
            >
           <option value="all">All Categories</option>
            {[...new Set(tasks.map((task) => task.category))].map((cat,index) => (
           <option key={index} value={cat}>
            {cat}
            </option>
             ))}
             </select>

             
  









            </div>




            <div className="taskList">
            <TaskList 
            tasks ={filteredTasks}
            onDelete={handleDeleteTask}
            onEdit={handleEditClick}
            onToggleComplete={toggleComplete}
            />
            </div>
        </div>
    );
    
   
    
    
};

export default DashBoard;