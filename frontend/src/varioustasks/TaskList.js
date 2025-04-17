import React from "react";
import '../styles/TaskList.css';
const TaskList=({tasks,onEdit,onDelete,onToggleComplete})=>{
    console.log("Task List Data:", tasks); // Debugging

    return (
        <div>
            <h3>     Your Tasks Will Be Displayed Here!</h3>
            
            {tasks.length===0 ?(<div className="no-tasksyet"><p > No tasks yet. Go ahead and add something productive!</p></div>
            ):(
                <div className="EachTaskWidth">
                    {tasks.map((task)=>{
                        console.log("Task Due Date:",task.duedate);
                        const formattedDueDate=task.duedate ? new Date(task.duedate).toLocaleDateString() : "No Due Date";;

                    
                    return(
                       
                        <div key={task._id}
                        className="task-card"
                        >
                            <div><strong>{task.title}</strong>:{task.description}</div>
                            <div style={{color: task.isComplete?"green":"orange",
                                fontWeight:"bold",
                                marginTop:"5px",
                            }}    
                           >
                            Status:{task.isComplete?"Done":"Pending"}
                            </div> 
                            <div style ={{marginTop:"5px"}}><strong>Category:</strong>{task.category||"No Category"}</div>
                            <div style={{marginTop:"5px"}}><strong>Due Date:</strong>{formattedDueDate}</div>
                            <div style={{marginTop:"5px"}}> <button onClick={()=>onEdit(task._id)}style={{marginRight:"10px"}}>Edit</button>
                            <button onClick={()=>onToggleComplete(task)} style ={{marginRight:"10px"}}> {task.isComplete?"Mark Pending ":"Mark Done"}</button>
                        
                            <button onClick={()=> onDelete(task._id)}style={{color:"red"}}> Delete</button>
                            </div>
                         </div> 
                    );  
                })}
                </div>
            )}
        </div>
    );
};

export default TaskList;