import axios from "axios";

const API = "http://localhost:4000/api";

export const registerRequest = (user: object) =>
  axios.post(`${API}/register`, user);
