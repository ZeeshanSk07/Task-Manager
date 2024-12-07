const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority, assignedTo } = req.body;
  console.log(req.body);
  const task = new Task({ title, description, dueDate, priority, assignedTo });
  await task.save();
  res.status(201).json({ message: "Task created", task });
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.userId }).populate("assignedTo", "username");
  res.json(tasks);
};

exports.getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
};

exports.updateTask = async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;
  await Task.findByIdAndUpdate(req.params.id, { title, description, dueDate, priority, status });
  res.json({ message: "Task updated" });
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
