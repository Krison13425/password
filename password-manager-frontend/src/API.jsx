import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080/api"; // replace with your Spring Boot server address

const cookies = new Cookies();

const token = cookies.get("user");

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (error) {
    return true;
  }
};

export const useLogout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    cookies.remove("user");
    localStorage.removeItem("email");
    sessionStorage.removeItem("mp");
    sessionStorage.removeItem("verified");
    navigate("/login");
  };
  return handleLogout;
};

export const getPassword = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/password/all`
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createPassword = async (password) => {
  try {
    const response = await axios.post(`${BASE_URL}/password/create`, password, {
      headers: {
        //   Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//USER

export const userExist = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/exist`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const verifyUser = async (userEmail) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/verifyUser?email=${userEmail}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const verifyToken = async (code, userEmail) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/verifyToken?token=${code}&email=${userEmail}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
