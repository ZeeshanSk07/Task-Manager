import React, { useEffect, useState } from "react";
import { getTasks, updateTask } from "../apis/tasks";
import { useNavigate } from "react-router-dom";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks(); 
        setTasks(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    console.log("Tasks updated:", tasks); 
  }, [tasks]);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus }); 
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  
  const priorities = ["high", "medium", "low"];

  return (
    <div className="task-list-container">
      <h2>Task List</h2>
      <button onClick={() => navigate("/dashboard/create")}>Create Task</button>
      
      
          {priorities.map((priority) => (
            <div key={priority} className={`priority-${priority.toLowerCase()}`}>
              <h3>{priority} Priority</h3>
              <ul>
                {tasks
                  .filter((task) => task.priority === priority)
                  .map((task) => (
                    <li key={task._id} onClick={() => navigate(`/dashboard/${task._id}`)}>
                      <h4>{task.title}</h4>
                      <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                      <p>Status: {task.status}</p>

                      {task.status !== "Completed" && (
                        <button onClick={() => updateTaskStatus(task._id, "Completed")}>
                          Mark as Completed
                        </button>
                      )}

                      {task.status !== "In Progress" && (
                        <button onClick={() => updateTaskStatus(task._id, "In Progress")}>
                          Mark as In Progress
                        </button>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        
    </div>
  );
}

export default TaskList;
