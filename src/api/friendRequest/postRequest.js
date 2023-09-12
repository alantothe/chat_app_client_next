import api from "../apiConfig";

export const acceptFriendRequest = async (form) => {
  try {
    const response = api.post("friendRequest/", form);
    return response;
  } catch (error) {
    console.log("Error: sending friend request.", error);
  }
};

export async function sendFriendRequest(form) {
  try {
    const response = await post("/friendRequest/", form);
    return response;
  } catch (err) {
    console.log("Error: sending friend request.", error);
  }
}
