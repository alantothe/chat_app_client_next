import api from "../apiConfig";

export const fetchAllConversationById = async (_id) => {
  try {
    const response = await api.post(`conversation/all/${_id}`);
    return response;
  } catch (error) {
    console.log("Error: fetching user.", error);
  }
};
