import axios from "axios";

const httpRequest = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const userLogin = async (email: string, password: string) => {
  const res = await httpRequest.post("/users/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await httpRequest.post("/users/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to Authenticate");
  }
  const data = await res.data;
  return data;
};
