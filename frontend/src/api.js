import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-backend-e1dr.onrender.com/api", // ✅ correct backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
