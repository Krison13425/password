import axios from "axios";

const BASE_URL = "http://localhost:8080/api"; // replace with your Spring Boot server address

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
    const response = await axios.post(
      `${BASE_URL}/password/create`,
      JSON.stringify(password),
      {
        headers: {
          //   Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
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
    const response = await axios.post(
      `${BASE_URL}/auth/register`,
      JSON.stringify(credentials),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      JSON.stringify(credentials),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
