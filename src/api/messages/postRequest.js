import api from "../apiConfig";

export const sendMessage = async (formData) => {
  try {
    const response = await api.post("messages/send", formData);
    return response.data;
  } catch (error) {
    console.log("Error: Registering user.", error);
  }
};
