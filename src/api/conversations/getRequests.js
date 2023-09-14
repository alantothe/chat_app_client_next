import api from "../apiConfig";

export const fetchAllConversationById = async (_id) => {
  try {
    const response = await api.get(`conversation/all/${_id}`);
    return response.data;
  } catch (error) {
    console.log("Error: fetching user.", error);
  }
};
