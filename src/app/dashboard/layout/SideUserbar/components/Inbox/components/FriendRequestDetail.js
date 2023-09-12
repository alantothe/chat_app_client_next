import { Button } from "@material-tailwind/react";
import { useState } from "react";
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from "@/api/friendRequest/postRequest";
import { useDispatch } from "react-redux";
import { getUserByIdThunk } from "@/redux/features/user/userThunks";

function FriendRequestDetail({ request }) {
  const dispatch = useDispatch();
  const { requesterId, recipientId, _id } = request;

  const [formData, setFormData] = useState({
    friendRequestID: _id,
    response: "",
    requesterId: requesterId._id,
    recipientId: recipientId._id,
  });

  const handleResponse = async (responseType) => {
    setFormData({
      ...formData,
      response: responseType,
    });

    try {
      let response;
      if (responseType === "accepted") {
        response = await acceptFriendRequest(formData);
      } else if (responseType === "rejected") {
        response = await rejectFriendRequest(formData);

        if (response) {
          dispatch(getUserByIdThunk(recipientId._id));
        }
      }
    } catch (err) {
      console.error();
    }
  };
  return (
    <div className="flex my-3 items-center">
      <img
        src={requesterId.avatar}
        alt="Avatar"
        className="object-cover w-12 h-12 rounded-full overflow-hidden"
      />
      <h1 className="ml-3">{requesterId.firstName}</h1>
      <h1 className="ml-1">{requesterId.lastName}</h1>
      <Button
        onClick={() => handleResponse("accepted")}
        className="bg-red-500 p-2 mx-2 h-8"
      >
        Accept
      </Button>
      <Button
        onClick={() => handleResponse("rejected")}
        className="bg-green-500 p-2 mx-2 h-8"
      >
        Reject
      </Button>
    </div>
  );
}

export default FriendRequestDetail;
