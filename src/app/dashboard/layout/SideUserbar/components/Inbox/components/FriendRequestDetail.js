import { Spinner, Button } from "@material-tailwind/react";
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
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    try {
      setIsLoading(true);
      const response = await acceptFriendRequest({
        friendRequestID: _id,
        response: "accepted",
        requesterId: requesterId._id,
        recipientId: recipientId._id,
      });
      if (response) {
        dispatch(getUserByIdThunk(recipientId._id));
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setIsLoading(true);
      const response = await rejectFriendRequest({
        friendRequestID: _id,
        response: "rejected",
        requesterId: requesterId._id,
        recipientId: recipientId._id,
      });
      if (response) {
        dispatch(getUserByIdThunk(recipientId._id));
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex my-3 items-center">
      <img
        src={requesterId.avatar}
        alt="Avatar"
        className="object-cover w-12 h-12 rounded-full overflow-hidden"
      />
      <h1 className="ml-3 text-white font-semibold">{requesterId.firstName}</h1>
      <h1 className="ml-1 text-white font-semibold">{requesterId.lastName}</h1>
      {isLoading ? (
        <Spinner className="h-12 w-12" />
      ) : (
        <>
          <Button onClick={handleAccept} className="bg-red-500 p-2 mx-2 h-8">
            Accept
          </Button>
          <Button onClick={handleReject} className="bg-green-500 p-2 mx-2 h-8">
            Reject
          </Button>
        </>
      )}
    </div>
  );
}

export default FriendRequestDetail;
