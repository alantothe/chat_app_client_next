import api from "../apiConfig";

export const sendMessage = async (formData) => {
  try {
    const response = await api.post("messages/send", formData);
    return response.data;
  } catch (error) {
    console.log("Error: Sending Message.", error);
  }
};

export const getMessages = async (array) => {
  try {
    const response = await api.post("messages/fetch-messages", array);
    return response.data;
  } catch (error) {
    console.log("Error: Fetching Messages.", error);
  }
};
