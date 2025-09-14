import axios from "axios";

// Debug: API config updated
const api = axios.create({
  baseURL: "https://task-manager-backend-e1dr.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

console.log(
  "✅ Using API Base URL:",
  "https://task-manager-backend-e1dr.onrender.com/api"
);

export default api;
