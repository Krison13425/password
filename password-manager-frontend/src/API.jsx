import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://localhost:8080/api";

const cookies = new Cookies();

const token = cookies.get("user");
let csrfToken = cookies.get("XSRF-TOKEN");

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (error) {
    return true;
  }
};

const UseLogout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    cookies.remove("user");
    cookies.remove("XSRF-TOKEN");
    localStorage.removeItem("email");
    sessionStorage.removeItem("mp");
    sessionStorage.removeItem("verified");
    navigate("/login");
  };
  return handleLogout;
};

const validateToken = () => {
  if (!token || isTokenExpired(token)) {
    UseLogout();
    throw new Error("Token expired or invalid");
  }
};

const getHeaders = () => {
  csrfToken = cookies.get("XSRF-TOKEN");
  return {
    Authorization: `Bearer ${token}`,
    "X-XSRF-TOKEN": csrfToken,
  };
};

const handleResponse = (response) => {
  csrfToken = response.headers["x-xsrf-token"];
  if (csrfToken) {
    cookies.set("XSRF-TOKEN", csrfToken);
  }
  return response.data;
};

// PASSWORD
export const getPassword = async () => {
  validateToken();
  try {
    const response = await axios.get(`${BASE_URL}/password/all`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createPassword = async (password) => {
  validateToken();
  try {
    const response = await axios.post(`${BASE_URL}/password/create`, password, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const changePassword = async (updatedPassword) => {
  validateToken();
  try {
    const response = await axios.put(
      `${BASE_URL}/password/edit`,
      updatedPassword,
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getPasswordById = async (id) => {
  validateToken();
  try {
    const response = await axios.get(`${BASE_URL}/password/${id}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deletePassword = async (id) => {
  validateToken();
  try {
    const response = await axios.delete(`${BASE_URL}/password/delete/${id}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  } catch (error) {
    throw error.response.data;
  }
};

//USER

export const userExist = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/exist`);
    return handleResponse(response);
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, credentials);
    return handleResponse(response);
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
    return handleResponse(response);
  } catch (error) {
    throw error.response.data;
  }
};

export const verifyUser = async (userEmail) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/verifyUser?email=${userEmail}`
    );
    return handleResponse(response);
  } catch (error) {
    throw error.response.data;
  }
};

export const verifyToken = async (code, userEmail) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/verifyToken?token=${code}&email=${userEmail}`
    );
    return handleResponse(response);
  } catch (error) {
    throw error.response.data;
  }
};
