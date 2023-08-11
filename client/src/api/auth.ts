import axios from "./axios";

export const registerRequest = (user: object) => axios.post(`/register`, user);

export const loginRequest = (user: object) => axios.post(`/login`, user);

export const verifyTokenRequest = (token: string) => axios.post("/verify");
