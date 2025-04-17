import "../styles/TaskForm.css";
import React,{useState,useEffect}from "react";
//import API from "../api";
//import {onAddTask,editingTask,fetchTasks} from "../api";
import {useNavigate} from "react-router-dom";

const TaskForm=({onAddTask,onUpdateTask,editingTask})=>{
    const[duedate,setTheDuedate]=useState("");
    //title input
    const[title,setTitle]=useState("");
    //description input
    const[description,setDescription]=useState("");
    //checkbox value
    const[isComplete,setIsComplete]=useState(false);
    //const [filterCategory, setFilterCategory] = useState("all");
    const [category, setCategory] = useState("Uncategorized");  // For task category

    //to show any error
    const[errorMessage,setErrorMessage]=useState("");
    //used to redirect after form submit
    const navigate =useNavigate();

    //fetch the existin data of the one being edited
    useEffect(()=>{
        if(editingTask){
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setIsComplete(editingTask.isComplete);
            setCategory(editingTask.category||"Uncategorized");
            setTheDuedate(editingTask.duedate?editingTask.duedate.slice(0,16):"");
        }else{
            setTitle("");
            setDescription("");
            setIsComplete(false);
            setCategory("Uncategorized");
            setTheDuedate("");
        }    
    },[editingTask]);


    /*
    useEffect(()=>{
        if(taskid){
            fetchTasks(`tasks/${taskid}`).then((res)=>{
                const data = res.data;
                setTitle(data.title);
                setDescription(data.description);
                setIsComplete(data.isComplete);
            })
            .catch((err)=>{
                console.error("Error fetching task :",err.message);
                setErrorMessage("Couldnt load the task info!");

            });
        }
    },[taskid]);
    */

    const handleFormSubmit=async(e)=>{
        e.preventDefault();
        if(!title.trim()||!description.trim()){
            setErrorMessage("Both title and description are required.");
            return;
        }
        setErrorMessage('');
        //const dueDateWithoutTime=duedate?new Date(duedate).toISOString().split('T')[0]:null;
        const dueDateonly =duedate||null;
        //console.log("Due Date:", dueDateWithoutTime );
        console.log("Task due date before submit:", duedate);
        
        
        const taskDetails={
            title,
            description,
            isComplete,
            category,
            duedate:dueDateonly,
        };
        console.log("Task Details to Send:", taskDetails);

        try{
            if(editingTask){
                await onUpdateTask(editingTask._id,taskDetails);
            }else{
                await onAddTask(taskDetails);
            }
            // Reset form fields after submission
            setTitle("");
            setDescription("");
            setIsComplete(false);
            setErrorMessage("");
            //navigate("/");
            
        }catch(error){
            console.log("Something went worn ",error.message);
            setErrorMessage("Error saving task");
        }
    };
    return (
        <div className="task-form-container">
            <h3>{editingTask?"Update Task" : "Add Your Task"}</h3>
            
            <form onSubmit={handleFormSubmit}className="task-form__field">
                    <label htmlFor="title" className="task-form__label"><strong>Title:</strong></label>
                    <input type="text"
                    id="title"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    />

    
                    
                
                <div className="task-form__field">
                <label htmlFor="description" className="task-form__label"><strong>Description:</strong></label>
                    <textarea
                    id="description"
                    placeholder="Add more details"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    ></textarea>
                </div>
                {/*
                <div>
                <label htmlFor="isComplete">
                    <input type="checkbox"
                    id="isComplete"
                    checked={isComplete}
                    //value={title}
                    onChange={(e)=>setIsComplete(e.target.checked)}
                    />
                    Mark as Done
                    </label>
                </div>*/}

                <div className="task-form__field">
                    <label htmlFor="duedate"  className="task-form__label"><strong>Mention Your Due Date:</strong></label>
                    <input 
                    type="date"
                    id="duedate"
                    value={duedate}
                    onChange={(e)=>setTheDuedate(e.target.value)}
                    />

                </div>

                <div className="task-form__field">
                    <label htmlFor="category"  className="task-form__label"><strong>Category:</strong></label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >    
                        <option value="">-- Select Category --</option>
                        <option value="Uncategorized">Uncategorized</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Urgent">Urgent</option>
                        {/* Add more categories if needed */}
                    </select>
                </div>





                {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
                <button type="submit"className="task-form__button">{editingTask?"Save Changes":"Add task"}</button>

            </form>
        </div>
    );


};
export default TaskForm;