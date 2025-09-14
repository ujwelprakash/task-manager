import { useState, useEffect, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const { data } = await api.get("/tasks", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch tasks");
    }
  };

  // Add new task
  const addTask = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.warning("⚠️ Title and description are required");
      return;
    }

    try {
      await api.post(
        "/tasks",
        { title, description, status: "Pending" },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTitle("");
      setDescription("");
      fetchTasks();
      toast.success("✅ Task added successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add task");
    }
  };

  // Update task status
  const updateTaskStatus = async (id, status) => {
    try {
      await api.put(
        `/tasks/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchTasks();
      toast.info(`ℹ️ Task marked as ${status}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update task");
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchTasks();
      toast.success("🗑️ Task deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks
  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">My Tasks</h2>

        {/* Task Form */}
        <form onSubmit={addTask} className="mb-6 flex flex-col gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            className="border p-2 rounded"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Task
          </button>
        </form>

        {/* Filter */}
        <div className="mb-4">
          <label className="mr-2 font-medium">Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Task List */}
        <ul className="space-y-2">
          {filteredTasks.map((t) => (
            <li
              key={t._id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{t.title}</h3>
                <p className="text-sm text-gray-600">{t.description}</p>
              </div>

              <div className="flex items-center gap-2">
                {/* Status dropdown */}
                <select
                  value={t.status}
                  onChange={(e) => updateTaskStatus(t._id, e.target.value)}
                  className="border p-1 rounded text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                {/* Delete button */}
                <button
                  onClick={() => deleteTask(t._id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
