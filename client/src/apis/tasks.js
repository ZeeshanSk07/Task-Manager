import axios from "axios";

const Backend_url = "http://localhost:4000/tasks";

// Function to get tasks
const getTasks = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${Backend_url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to create a new task
const createTask = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${Backend_url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to update an existing task
const updateTask = async (id, data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${Backend_url}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to delete a task
const deleteTask = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${Backend_url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Common error handler
const handleError = (error) => {
  if (error.response && error.response.status === 400) {
    throw new Error(error.response.data.message);
  } else {
    console.error(error);
    throw new Error("An error occurred while processing the request.");
  }
};

export { getTasks, createTask, updateTask, deleteTask };
