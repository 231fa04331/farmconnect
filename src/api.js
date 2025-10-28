import axios from "axios";

// Read base URL from environment variable
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default API;
