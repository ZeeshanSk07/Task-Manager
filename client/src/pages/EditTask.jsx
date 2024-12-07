import React, { useEffect, useState } from "react";
import './EditTask.css';
import { useParams, useNavigate } from "react-router-dom";
import { getTasks, updateTask } from "../apis/tasks"; 
import toast from 'react-hot-toast';

function EditTask() {
  const { id } = useParams();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "In Progress",
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(id, task);
      toast.success('Task updated successfully');
      navigate(`/dashboard/${id}`); 
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="edit-task-container">
      <h2>Edit Task</h2>
      <form className="editform" onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            required
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
}

export default EditTask;