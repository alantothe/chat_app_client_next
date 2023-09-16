import api from "../apiConfig";

export const fetchAllConversationById = async (_id) => {
  try {
    const response = await api.get(`conversation/all/${_id}`);
    return response.data;
  } catch (error) {
    console.log("Error: fetching user.", error);
  }
};

export const fetchGroupConversationById = async (_id) => {
  try {
    const response = await api.get(`conversation/group/${_id}`);
    return response.data;
  } catch (error) {
    console.log("Error: fetching user.", error);
  }
};
