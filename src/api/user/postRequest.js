import api from "../apiConfig.js";

export async function registerUser(credentials) {
  try {
    const response = await api.post("/users/register", credentials);
    return response;
  } catch (error) {
    console.log("Error: Registering user.", error);

    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw error;
    }
  }
}

export async function loginUser(credentials) {
  try {
    const response = await api.post("/users/login", credentials);
    return response;
  } catch (error) {
    console.log("Error: logging user.", error);
  }
}
