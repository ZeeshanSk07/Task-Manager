import React, { useState } from "react";
import { createTask } from "../apis/tasks";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    await createTask({ title, description, dueDate, priority });
    toast.success('Task created successfully');
    navigate("/dashboard");
  };

  return (
    <div className="create-task-container">
      <h2>Create Task</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateTask;
