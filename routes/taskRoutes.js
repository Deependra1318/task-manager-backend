const express = require("express");
const router = express.Router();

const { 
  createTask, 
  updateTaskStatus, 
  getTasksByProject,
  getDashboard
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");

// create task
router.post("/", authMiddleware, createTask);

// dashboard (PUT THIS FIRST ✅)
router.get("/dashboard", authMiddleware, getDashboard);

// get tasks by project
router.get("/project/:projectId", authMiddleware, getTasksByProject);

// update task
router.put("/:id", authMiddleware, updateTaskStatus);

module.exports = router;