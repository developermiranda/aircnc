import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:3333"
  baseURL: "http://172.16.10.28:3333" //configuracao job
  // baseURL: "http://172.20.10.2:3333" //configuracao celular
});

export default api;
