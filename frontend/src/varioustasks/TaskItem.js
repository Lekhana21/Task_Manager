import "../styles/TaskItem.css"
import React from "react";

//to hande display of single task item

const TaskItem =({task,onEdit,onDelete,onToggleComplete})=>{
   
    return(
        <div className="taskCardEdit">
            <h3 className="titleOfTask">{task.title}</h3>
            <p className="DescriptionOfTask">{task.description}</p>
        
            <p className ={`statusOftask ${task.isComplete ? "completed":"pending"}`}>
                Status:<strong>{task.isComplete?"Completed":"Pending"}</strong></p>
            
           


            <div className="Buttons">
                <button onClick={()=>onEdit(task)}> Edit</button>
                <button onClick={()=>onToggleComplete(task)}>
                    {task.isComplete?"Mark Pending" : "Mark Complete"}

                </button>
                <button className="deletebutton" onClick={()=>onDelete(task._id)}>Delete</button>
        </div>
    </div>
    );
};



export default TaskItem;