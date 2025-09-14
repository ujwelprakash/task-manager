import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-backend.onrender.com/api",

  headers: {
    "Content-Type": "application/json", // 👈 Force JSON
  },
});

export default api;
