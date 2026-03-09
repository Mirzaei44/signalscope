import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("access", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }
};

const savedToken = localStorage.getItem("access");
if (savedToken) {
  setAuthToken(savedToken);
}

export default api;