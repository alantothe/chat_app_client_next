import api from "../apiConfig.js";

export async function getUserById(_id) {
  try {
    const response = await api.get(`/users/user/${_id}`);
    return response.data;
  } catch (error) {
    console.log("Error: fetching user.", error);
  }
}
