const Project = require("../models/Project");

// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const { name } = req.body;

    const project = await Project.create({
      name,
      createdBy: req.user.id,   // comes from token
      members: [req.user.id]
    });

    res.status(201).json({
      message: "Project created",
      project
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};