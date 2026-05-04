const Task = require("../models/Task");


// ================= CREATE TASK =================
exports.createTask = async (req, res) => {
  try {
    const { title, project, assignedTo, dueDate } = req.body;

    const task = await Task.create({
      title,
      project,
      assignedTo,
      dueDate
    });

    res.status(201).json({
      message: "Task created",
      task
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ================= UPDATE TASK STATUS =================
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      message: "Task updated",
      task
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ================= GET TASKS BY PROJECT =================
exports.getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId
    });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ================= DASHBOARD STATS =================
exports.getDashboard = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user.id
    });

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "done").length;
    const pending = tasks.filter(t => t.status !== "done").length;

    const overdue = tasks.filter(
      t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "done"
    ).length;

    res.json({
      total,
      completed,
      pending,
      overdue
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};