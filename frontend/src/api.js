import axios from "axios";

const API =axios.create({
    baseURL:"http://localhost:5000/api",
});

API.interceptors.request.use((req)=>{
    const token =localStorage.getItem("token");
    if(token){
        req.headers.Authorization=`Bearer ${token}`;
    }
    return req;
});

export const fetchTasks=()=>API.get("/tasks");
export const createTasks=(task)=>API.post("/tasks",task);
export const updateTask=(id,updatedTask)=>API.put(`/tasks/${id}`,updatedTask);
export const deleteTasks=(id)=>API.delete(`/tasks/${id}`);
