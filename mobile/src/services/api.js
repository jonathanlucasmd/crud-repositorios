import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
  //192.168.0.110/24
});

export default api;
