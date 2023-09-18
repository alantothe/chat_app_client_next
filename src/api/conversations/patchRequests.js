import api from "../apiConfig";

export const seenBy = async (data) => {
  try {
    const { _id, conversationId } = data;
    const response = await api.patch(`conversation/seen/${conversationId}`, {
      _id,
    });
    return response.data;
  } catch (error) {
    console.log("Error: Fetching Messages.", error);
  }
};
