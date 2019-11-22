import axios from "axios";

const api = axios.create({
  baseURL: "http://172.16.10.28:3333"
});

export default api;
