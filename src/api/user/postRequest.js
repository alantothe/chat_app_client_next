import api from "../apiConfig.js";

export async function registerUser(credentials) {
  try {
    const response = await api.post("/users/register", credentials);
    return response;
  } catch (error) {
    console.log("Error: Registering user.", error);
  }
}
