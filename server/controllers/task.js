const Task = require("../models/task");

const createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  const task = new Task({ title, description, dueDate, priority, assignedTo : req.user.userID });
  await task.save();
  res.status(201).json({ message: "Task created", task });
};

const getTasks = async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user.userID }).populate("assignedTo", "username");
  res.json(tasks);
};

const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
};

const updateTask = async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;
  await Task.findByIdAndUpdate(req.params.id, { title, description, dueDate, priority, status });
  res.json({ message: "Task updated" });
};

const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };