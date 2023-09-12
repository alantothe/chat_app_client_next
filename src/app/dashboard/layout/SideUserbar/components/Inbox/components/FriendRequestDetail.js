import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { acceptFriendRequest } from "@/api/friendRequest/postRequest";
import { useDispatch } from "react-redux";
import { getUserByIdThunk } from "@/redux/features/user/userThunks";

function FriendRequestDetail({ request }) {
  const dispatch = useDispatch();
  const { requesterId, recipientId, _id } = request;
  console.log(request);
  const [formData, setFormData] = useState({
    friendRequestID: _id,
    response: "accepted",
    requesterId: requesterId._id,
    recipientId: recipientId._id,
  });
  console.log(formData);

  const handleAccept = async () => {
    try {
      const response = await acceptFriendRequest(formData);
      if (response) {
        dispatch(getUserByIdThunk(recipientId._id));
      }
    } catch (err) {}
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
      <Button onClick={handleAccept} className="bg-red-500 p-2 mx-2 h-8">
        Accept
      </Button>
      <Button className="bg-green-500 p-2 mx-2 h-8">Reject</Button>
    </div>
  );
}

export default FriendRequestDetail;
