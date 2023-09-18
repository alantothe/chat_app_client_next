import api from "../apiConfig";

export const seenBy = async (formData) => {
  try {
    const response = await api.post("conversation/seenBy", formData);
    return response.data;
  } catch (error) {
    console.log("Error: Fetching Messages.", error);
  }
};
