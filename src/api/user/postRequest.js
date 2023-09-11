import api from "../apiConfig.js";

export async function registerUser(credentials) {
  try {
    const response = await api.post("/users/register", credentials);
    return response;
  } catch (error) {
    console.log("Error: Registering user.", error);
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

export async function sendFriendRequest(form) {
  try {
    const response = await post("/friendRequest/", form);
    return response;
  } catch (err) {
    console.log("Error: sending friend request.", error);
  }
}
