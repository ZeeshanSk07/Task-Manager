import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTasks, deleteTask } from "../apis/tasks"; 
import toast from "react-hot-toast";

function TaskDetails() {
  const { id } = useParams(); 
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTasks();
        const task = response.find((task) => task._id === id);
        setTask(task);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchTask();
  }, [id]);

  const handleEdit = () => {
    navigate(`/dashboard/edit/${id}`); 
  };

  const handleDelete = async () => {
    try {
      await deleteTask(id);
      toast.success('Task deleted successfully')
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
    <button style={{width:'7vw', fontSize:'1rem', margin:'2rem 3rem'}} onClick={(e)=>navigate('/dashboard')}>Back</button>
    <div className="task-details-container">
      {task ? (
        <>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p>Status: {task.status}</p>

          <div className="task-actions">
            <button onClick={handleEdit}>Edit Task</button>
            <button onClick={handleDelete}>Delete Task</button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </>
  );
  
}

export default TaskDetails;
