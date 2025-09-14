import Task from "../models/Task.js";

// ================== GET TASKS ==================
export const getTasks = async (req, res) => {
  try {
    console.log("=== GET TASKS REQUEST ===");
    console.log("USER:", req.user);

    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (err) {
    console.error("🔥 Error in getTasks:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ================== CREATE TASK ==================
export const createTask = async (req, res) => {
  try {
    console.log("=== CREATE TASK REQUEST ===");
    console.log("BODY RECEIVED:", req.body);
    console.log("USER:", req.user);

    const { title, description, status } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized, no user found" });
    }

    const task = new Task({
      user: req.user._id,
      title,
      description,
      status: status || "Pending",
    });

    const createdTask = await task.save();
    console.log("✅ Task created:", createdTask._id);
    res.status(201).json(createdTask);
  } catch (err) {
    console.error("🔥 Error in createTask:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ================== UPDATE TASK ==================
export const updateTask = async (req, res) => {
  try {
    console.log("=== UPDATE TASK REQUEST ===", req.params.id);
    console.log("BODY RECEIVED:", req.body);

    const task = await Task.findById(req.params.id);

    if (task && task.user.toString() === req.user._id.toString()) {
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.status = req.body.status || task.status;

      const updatedTask = await task.save();
      console.log("✅ Task updated:", updatedTask._id);
      res.json(updatedTask);
    } else {
      console.log("❌ Task not found or not authorized");
      res.status(404).json({ message: "Task not found or not authorized" });
    }
  } catch (err) {
    console.error("🔥 Error in updateTask:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ================== DELETE TASK ==================
export const deleteTask = async (req, res) => {
  try {
    console.log("=== DELETE TASK REQUEST ===", req.params.id);

    const task = await Task.findById(req.params.id);

    if (task && task.user.toString() === req.user._id.toString()) {
      await task.deleteOne();
      console.log("✅ Task deleted:", task._id);
      res.json({ message: "Task removed" });
    } else {
      console.log("❌ Task not found or not authorized");
      res.status(404).json({ message: "Task not found or not authorized" });
    }
  } catch (err) {
    console.error("🔥 Error in deleteTask:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
